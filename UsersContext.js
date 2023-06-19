import { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UsersContext = createContext();

function UsersProvider({ children }) {
  //   const [users, setUsers] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState(null);

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
    // console.log(content);
  }

  async function checkUserAvailability(email) {
    await fetch(
      "http://10.0.2.2:4000/userAvailable",
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
      // { username: username }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
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
      console.log(token, user);
      setFirstName(user);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        registerUser,
        login,
        logout,
        firstName,
        token,
        checkUserAvailability,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider };
