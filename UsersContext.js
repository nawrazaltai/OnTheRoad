import { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UsersContext = createContext();

function UsersProvider({ children }) {
  //   const [users, setUsers] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);
  const [likes, setLikes] = useState([]);
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [shuffledCars, setShuffledCars] = useState([]);
  const [allBrands, setAllBrands] = useState();

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
  }

  useEffect(() => {
    const shuffled = allCars?.sort(() => 0.5 - Math.random());
    // const fourRecommendations = shuffled.slice(0, 4);
    // console.log(shuffled);
    setShuffledCars(shuffled);
    getBrands();
  }, [allCars]);

  function getBrands() {
    let uniqueBrands = [];

    for (let i = 0; i < allCars?.length; i++) {
      let currentCar = allCars[i];

      const brandExists = uniqueBrands?.some(
        (car) => car.brand == currentCar.brand
      );
      if (brandExists) {
        continue;
      } else {
        uniqueBrands.push({
          brand: currentCar.brand,
          url: currentCar.logo_url,
        });
      }
    }
    setAllBrands(uniqueBrands);

    // const response = await fetch("http://10.0.2.2:4000/brands", {
    //   // 10.0.2.2:3000
    //   method: "GET",
    //   mode: "cors",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   // body: JSON.stringify(newUser),
    // });
    // const content = await response.json();
    // setAllBrands(content.brands);
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
      setLastName(content.data.last_name);
      setEmail(content.data.email);
      setToken(content.token);
      AsyncStorage.setItem("token", content.token);
      AsyncStorage.setItem("firstName", content.data.first_name);
      AsyncStorage.setItem("lastName", content.data.last_name);
      AsyncStorage.setItem("email", content.data.email);
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
      const first_name = await AsyncStorage.getItem("firstName");
      setFirstName(first_name);
      const last_name = await AsyncStorage.getItem("lastName");
      setLastName(last_name);
      const email = await AsyncStorage.getItem("email");
      setEmail(email);
      // const favorites = await AsyncStorage.getItem("favoriteCars");
      // const res = JSON.parse(favorites);
      // console.log("RESULT", favorites);
      // setFavoriteCars(favorites);
    } catch (e) {
      console.log("error", e);
    }
  };
  useEffect(() => {
    saveFavorites();
  }, [likes]);

  useEffect(() => {
    isLoggedIn();
    getCars();
    getBrands();
    handleLiked();
  }, []);

  function handleLikeEvent(id) {
    // let res = [];

    if (likes) {
      res = [...likes];

      if (res?.includes(id)) {
        let idx = res.indexOf(id);
        res.splice(idx, 1);
      } else {
        res.push(id);
      }
      setLikes(res);
    }
  }

  const handleLiked = async () => {
    let data = await AsyncStorage?.getItem("favoriteCars");
    let arr = JSON.parse(data);

    // Create res array containing all car ids and setLikes to res.
    let res = arr?.map((car) => car.id);
    setFavoriteCars(arr);
    setLikes(res);
  };

  function resetLikes() {
    setLikes((prev) => []);
  }

  // Handle FavoriteCars array.
  function saveFavorites() {
    let arr = [];
    let allCarsCopy = [...allCars];
    allCarsCopy?.map((car) => {
      if (likes?.includes(car.id)) {
        arr.push(car);
      }
      setFavoriteCars(arr);
    });
  }

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
        lastName,
        token,
        email,
        checkUserAvailability,
        allCars,
        handleLikeEvent,
        likes,
        favoriteCars,
        allBrands,
        resetLikes,
        shuffledCars,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider };
