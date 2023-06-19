import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import RightArrow from "react-native-vector-icons/FontAwesome5";

import { UsersContext } from "../UsersContext";
import { useContext, useEffect } from "react";

export default function OnboardingScreen2({ navigation }) {
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

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/onboarding3.jpg")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <Text style={styles.title}>
          Don't have a driver's license?
          {/* <Text style={{ color: "#32928c", letterSpacing: 2 }}> 24/7</Text> */}
        </Text>
        <Text style={styles.desc}>
          No worries, with OnTheRoad you can rent a car with your own {""}
          <Text
            style={{
              color: "#32928c",
              letterSpacing: 1,
              fontFamily: "MontserratSemiBold",
            }}
          >
            private chauffeur.
          </Text>
        </Text>
        <View style={styles.bottomDiv}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
            }}
            onPress={() => navigation.navigate("LoginOrSignup")}
          >
            <Text style={styles.get_started_text}>Let's get started!</Text>
            <RightArrow name="arrow-right" color="white" size={20} />
          </TouchableOpacity>
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
    fontSize: 45,
    paddingLeft: 15,
    paddingTop: 22,
    // letterSpacing: 1.75,
    paddingRight: 10,
    fontFamily: "MontserratSemiBold",
  },
  desc: {
    color: "#fcfaf7",
    fontSize: 20,
    lineHeight: 28,
    width: "100%",
    fontWeight: 300,
    paddingLeft: 15,
    paddingTop: 3,
    paddingRight: 15,
  },
  bottomDiv: {
    // flex: 1,
    position: "absolute",
    backgroundColor: "#32928c",
    flexDirection: "row",
    bottom: 20,
    right: 0,
    left: 0,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    borderRadius: 15,
  },
  get_started_text: {
    color: "#fff",
    fontFamily: "MontserratRegular",
    fontSize: 25,
    fontWeight: 700,
    marginRight: 5,
    letterSpacing: 1.1,
  },
});
