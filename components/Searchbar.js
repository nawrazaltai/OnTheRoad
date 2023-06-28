import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UsersContext } from "../UsersContext";
import * as Location from "expo-location";
import LocationIcon from "react-native-vector-icons/Ionicons";
import UserCircle from "react-native-vector-icons/FontAwesome";
import MenuIcon from "react-native-vector-icons/Ionicons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import SearchIcon from "react-native-vector-icons/Ionicons";

export default function Searchbar() {
  const { allCars } = useContext(UsersContext);
  const [searchWord, setSearchWord] = useState("");

  function search() {
    let res = [];
    allCars.filter((car) => {
      if (
        car.brand.toLowerCase().includes(searchWord.toLowerCase()) ||
        car.model.toLowerCase().includes(searchWord.toLowerCase())
      ) {
        res.push(car);
        // console.log(car);
      }
      // return car.brand == searchWord;
    });
  }

  useEffect(() => {
    search();
  }, [searchWord]);

  const [loaded] = useFonts({
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratThin: require("../assets/fonts/Montserrat-Thin.ttf"),
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  useEffect(() => {
    async function Prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    Prepare();
    // getCars();
  }, []);

  if (!loaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <View style={styles.searchbar}>
      <SearchIcon name="search-sharp" size={28} color={"black"} />
      <TextInput
        clearButtonMode="while-editing"
        style={styles.input_field}
        placeholder="Search for a car.."
        placeholderTextColor={"black"}
        value={searchWord}
        onChangeText={setSearchWord}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    width: 370,
    height: 45,
    marginLeft: 5,
    borderWidth: 2,
    borderStyle: "solid",
    // borderColor: "gray",
    borderColor: "#32928c",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingLeft: 4,
    backgroundColor: "#FFF",
  },
  input_field: {
    fontSize: 18,
    paddingLeft: 4,
    width: "100%",
    fontFamily: "MontserratRegular",
  },
});
