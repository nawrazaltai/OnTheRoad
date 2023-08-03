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
import Header from "../components/Header";
import ModalWrapper from "../components/ModalWrapper";
import animation from "../assets/error.json";

export default function Home({ navigation, route }) {
  const { firstName, getCars, logout, allCars, shuffledCars, isModalVisible } =
    useContext(UsersContext);
  const [message, setMessage] = useState("");
  // const [location, setLocation] = useState();

  function capitalFirstLetter(name) {
    return name?.charAt(0).toUpperCase() + name?.slice(1);
  }

  useEffect(() => {
    setMessage(route?.params?.message);
  }, [route?.params]);

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

  // const shuffled = allCars.sort(() => 0.5 - Math.random());
  // const fourRecommendations = shuffled.slice(0, 4);
  // console.log(shuffled);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        style={styles.scrollview_container}
      >
        <View style={styles.welcome_text_view}>
          <Text style={styles.welcome_text}>
            Hello {capitalFirstLetter(firstName)},
          </Text>
          <Text style={styles.find_car_text}>Let's find you a rental car!</Text>
        </View>
        <Searchbar />
        <TrendingBrands />
        <PopularCars
          cars={shuffledCars}
          title={"Recommendations"}
          viewAll={true}
          carsAmount={4}
        />
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("HistoryBookings")}
        >
          <Text>History</Text>
        </TouchableOpacity> */}
      </ScrollView>

      {isModalVisible && message === "Fail" ? (
        <ModalWrapper
          title="Something went wrong.."
          animation={animation}
          bottomText="Please try to complete your rent again."
          backgroundColor="#D10000"
          navigateTo="Home"
        ></ModalWrapper>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   // flex: 1,
  //   paddingHorizontal: 10,
  //   backgroundColor: "#F2F5F7",
  // },
  scrollview_container: {
    // flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#F2F5F7",
    marginBottom: 90,
  },
  welcome_text: {
    marginTop: 20,
    paddingLeft: 5,
    fontSize: 24,
    fontFamily: "MontserratRegular",
  },
  welcome_text_view: {
    marginTop: -10,
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
