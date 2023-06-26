import { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UsersContext = createContext();

function UsersProvider({ children }) {
  //   const [users, setUsers] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState(null);
  const [likes, setLikes] = useState([]);
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [emailCheck, setEmailCheck] = useState("");

  function handleLikeEvent(id) {
    let res = [...likes];
    if (res.includes(id)) {
      let idx = res.indexOf(id);
      res.splice(idx, 1);
    } else {
      res.push(id);
    }
    setLikes(res);
  }

  async function registerUser(newUser) {
    const response = await fetch("http://10.0.2.2:4000/users", {
      // 10.0.2.2:3000
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const content = await response.json();
    login({ email: newUser.email, password: newUser.password });

    // console.log(content);
  }

  async function getCars() {
    // let carsCopy = [...allCars];
    const response = await fetch("http://10.0.2.2:4000/cars", {
      // 10.0.2.2:3000
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(newUser),
    });
    const content = await response.json();
    // carsCopy.push(content);
    setAllCars(content.cars);
    // console.log();
  }

  async function checkUserAvailability(email) {
    const result = await fetch("http://10.0.2.2:4000/userAvailable", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((res) => res.json());
    if (result?.emailCheck) {
      return true;
    }
  }

  async function login(userInput) {
    const response = await fetch("http://10.0.2.2:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    const content = await response.json();
    if (Object.values(content).length > 0) {
      setFirstName(content.data.first_name);
      setToken(content.token);
      AsyncStorage.setItem("token", content.token);
      // AsyncStorage.setItem("token", token);
      AsyncStorage.setItem("user", content.data.first_name);
      // AsyncStorage.setItem("user", firstName);
      //   setLastName(content.data.last_name);
    }
  }

  const logout = () => {
    setToken(null);
    AsyncStorage.removeItem("token");
  };

  const isLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setToken(token);
      const user = await AsyncStorage.getItem("user");
      setFirstName(user);
      // const favorites = await AsyncStorage.getItem("favoriteCars");
      // const res = JSON.parse(favorites);
      // console.log("RESULT", favorites);
      // setFavoriteCars(favorites);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    isLoggedIn();
    getCars();
    handleLiked();
  }, []);

  const handleLiked = async () => {
    let data = await AsyncStorage?.getItem("favoriteCars");
    let arr = JSON.parse(data);

    // Create res array containing all car ids and setLikes to res.
    let res = arr?.map((car) => car.id);
    setFavoriteCars(arr);
    setLikes(res);
  };

  // Handle FavoriteCars array.
  function saveFavorites() {
    let arr = [];
    allCars.map((car) => {
      if (likes.includes(car.id)) {
        arr.push(car);
      }
      setFavoriteCars(arr);
    });
  }
  useEffect(() => {
    saveFavorites();
  }, [likes]);

  const storeInStorage = async () => {
    await AsyncStorage?.setItem("favoriteCars", JSON.stringify(favoriteCars));
  };

  useEffect(() => {
    storeInStorage();
  }, [favoriteCars]);

  return (
    <UsersContext.Provider
      value={{
        registerUser,
        login,
        logout,
        firstName,
        token,
        checkUserAvailability,
        allCars,
        handleLikeEvent,
        likes,
        favoriteCars,
        emailCheck,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider };
