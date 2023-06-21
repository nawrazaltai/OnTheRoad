import React, { useContext, useEffect, useState } from "react";
import {
  View,
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
import Searchbar from "../components/Searchbar";
import TrendingBrands from "../components/TrendingBrands";
import PopularCars from "../components/PopularCars";

export default function Home({ navigation }) {
  const { firstName, getCars, logout } = useContext(UsersContext);
  // const [location, setLocation] = useState();
  const [lat, setLat] = useState(25.276987);
  const [long, setLong] = useState(55.296249);
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState("");

  function capitalFirstLetter(name) {
    return name?.charAt(0).toUpperCase() + name?.slice(1);
  }

  const getAddress = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Access to Location denied");
    }

    // const location = await Location.getCurrentPositionAsync({
    //   accuracy: Location.Accuracy.Highest,
    //   maximumAge: 10000,
    // });
    // setLocation(location);
    // console.log(location);

    const loc = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: long,
    });
    setCity(loc[0].city);
    setCountryCode(loc[0].isoCountryCode);
    // console.log(loc[0].isoCountryCode);
  };

  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //   prepare();
  // }, []);

  const [loaded] = useFonts({
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratThin: require("../assets/fonts/Montserrat-Thin.ttf"),
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  useEffect(() => {
    getAddress();
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.top_div}>
          <TouchableOpacity>
            <MenuIcon name="menu-outline" size={38} color={"black"} />
          </TouchableOpacity>
          <View style={styles.location_view}>
            <LocationIcon name="location" size={20} color={"#32928c"} />
            <Text style={styles.location_text}>
              {city}, {countryCode}
            </Text>
          </View>
          <UserCircle name="user-circle" size={38} color="gray" />
        </View>
        <View>
          <Text style={styles.welcome_text}>
            Hello {capitalFirstLetter(firstName)},
          </Text>
          <Text style={styles.find_car_text}>Let's find you a rental car!</Text>
        </View>
        <Searchbar />
        <TrendingBrands />
        <PopularCars />

        {/* <TouchableOpacity onPress={() => logout()}>
          <Text style={{ color: "black", fontSize: 30 }}>Logout</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#F2F5F7",
  },
  top_div: {
    flexDirection: "row",
    // width: "100%",
    // paddingVertical: 20,
    paddingTop: 20,
    paddingBottom: 0,
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "MontserratRegular",
  },
  welcome_text: {
    marginTop: 20,
    paddingLeft: 5,
    fontSize: 24,
    fontFamily: "MontserratRegular",
  },
  find_car_text: {
    marginTop: -2,
    paddingLeft: 6,
    fontSize: 23,
    letterSpacing: 0.96,
    fontFamily: "MontserratRegular",
  },
  location_view: {
    flexDirection: "row",
    alignItems: "center",
  },
  location_text: {
    color: "gray",
    fontSize: 15,
    // fontWeight: 700,
    fontFamily: "MontserratSemiBold",
  },
});
