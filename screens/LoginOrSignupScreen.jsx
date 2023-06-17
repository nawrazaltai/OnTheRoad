import React, { useState, useEffect, useContext } from "react";
// import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
} from "react-native";
import Svg, { Path, RNSVGSvgAndroid } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { UsersContext } from "../UsersContext";
import { Formik } from "formik";
import * as yup from "yup";

export default function LoginOrSignup({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/test.jpg")}
        resizeMode="cover"
        style={{ flex: 2, marginBottom: 0 }}
      >
        <Text style={styles.welcome_text}>
          Welcome to <Text style={{ color: "#32928c" }}> OnTheRoad!</Text>
        </Text>
      </ImageBackground>
      <View style={styles.bottom_div2}>
        <Svg
          height={"100%"}
          width={"100%"}
          viewBox="0 0 1440 320"
          style={{ position: "absolute", bottom: 175 }}
        >
          <Path
            width={100}
            fill="#fff"
            d="M0,160L80,138.7C160,117,320,75,480,96C640,117,800,203,960,208C1120,213,1280,139,1360,101.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></Path>
        </Svg>
      </View>

      <View style={styles.bottom_div}>
        <Svg
          height={"100%"}
          width={"100%"}
          viewBox="0 0 1440 320"
          style={{ position: "absolute", bottom: 170 }}
        >
          <Path
            fill="#32928c"
            d="M0,160L80,138.7C160,117,320,75,480,96C640,117,800,203,960,208C1120,213,1280,139,1360,101.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></Path>
        </Svg>
      </View>

      <View style={styles.cta_div}>
        <TouchableOpacity
          style={styles.login_btn}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.login_btn_text}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signup_btn}>
          <Text style={styles.signup_btn_text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome_text: {
    fontFamily: "MontserratSemiBold",
    fontSize: 48,
    letterSpacing: 1,
    marginVertical: 35,
    marginHorizontal: 15,
  },
  bottom_div: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: "#32928c",
    // alignItems: "center",
    // justifyContent: "center",
    // flex: 1,
  },
  bottom_div2: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 250,
    backgroundColor: "#fff",
  },

  cta_div: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  login_btn: {
    width: 300,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 14,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 10,
  },
  signup_btn: {
    width: 300,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 10,
  },

  login_btn_text: {
    fontFamily: "MontserratSemiBold",
    color: "#32928c",
    fontSize: 18,
  },

  signup_btn_text: {
    fontFamily: "MontserratSemiBold",
    color: "#fff",
    fontSize: 18,
  },
});
