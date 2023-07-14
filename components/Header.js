import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UsersContext } from "../UsersContext";
import LocationIcon from "react-native-vector-icons/Ionicons";
import UserCircle from "react-native-vector-icons/FontAwesome";
import MenuIcon from "react-native-vector-icons/Ionicons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Searchbar from "../components/Searchbar";
import TrendingBrands from "../components/TrendingBrands";
import PopularCars from "../components/PopularCars";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const { city, countryCode, getAddress } = useContext(UsersContext);

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
    <View style={styles.top_div}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MenuIcon name="menu-outline" size={38} color={"black"} />
      </TouchableOpacity>
      <View style={styles.location_view}>
        <TouchableOpacity onPress={() => getAddress()}>
          <LocationIcon name="location" size={20} color={"#32928c"} />
        </TouchableOpacity>
        {city && countryCode ? (
          <Text style={styles.location_text}>
            {city}, {countryCode}
          </Text>
        ) : (
          <ActivityIndicator size="small" color={"#32928c"} />
        )}
      </View>
      <UserCircle name="user-circle" size={38} color="gray" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  top_div: {
    flexDirection: "row",
    // width: "100%",
    // paddingVertical: 20,
    paddingTop: 20,
    marginHorizontal: 10,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "MontserratRegular",
    backgroundColor: "#F2F5F7",
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
