import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import RightArrow from "react-native-vector-icons/FontAwesome";

import { SafeAreaView } from "react-native-safe-area-context";

import { UsersContext } from "../UsersContext";

export default function OnboardingScreen1({ navigation }) {
  const [loaded] = useFonts({
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratThin: require("../assets/fonts/Montserrat-Thin.ttf"),
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!loaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  // const { token } = useContext(UsersContext);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/cars.jpg")}
        // resizeMode="contain"
        style={{ flex: 1 }}
      >
        <Text style={styles.title}>
          Chose from our <Text style={{ color: "#32928c" }}>wide</Text> variety
          of car brands
        </Text>
        <Text style={styles.desc}>
          Our car collection consists of a wide variety of cars, from SUVs to
          Electric and Sports cars.
        </Text>
        <View style={styles.bottomDiv}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginOrSignup")}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dots}>
            <View style={styles.active}></View>
            <View style={styles.inactive}></View>
            <View style={styles.inactive}></View>
          </View>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
              }}
              onPress={() => navigation.navigate("Onboarding2")}
            >
              <Text style={styles.nextText}>Next</Text>
              <RightArrow name="angle-double-right" color="white" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 42,
    paddingLeft: 15,
    paddingTop: 25,
    // letterSpacing: 1.75,
    paddingRight: 10,
    fontFamily: "MontserratSemiBold",
  },
  desc: {
    color: "#fcfaf7",
    fontSize: 23,
    lineHeight: 28,
    width: "100%",
    fontWeight: 300,
    paddingLeft: 15,
    paddingTop: 10,
    paddingRight: 15,
  },
  bottomDiv: {
    // flex: 1,
    position: "absolute",
    flexDirection: "row",
    bottom: 10,
    right: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "space-between",
    // borderWidth: 1,
    // borderColor: "red",
    // borderStyle: "solid",
    marginHorizontal: 8,
  },
  skipText: {
    color: "gray",
    fontFamily: "MontserratRegular",
    fontSize: 20,
    fontWeight: 400,
  },
  dots: {
    flex: 1,
    // borderColor: "green",
    // borderStyle: "solid",
    flexDirection: "row",
    borderStyle: "solid",
    alignItems: "center",
    gap: 15,
    justifyContent: "center",
  },
  active: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: "#32928c",
  },
  inactive: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderRadius: 50,
    // borderRadius: "50%",
    backgroundColor: "white",
  },
  nextText: {
    color: "#fff",
    fontFamily: "MontserratRegular",
    fontSize: 20,
  },
});
