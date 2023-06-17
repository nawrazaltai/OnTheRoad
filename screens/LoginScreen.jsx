import React, { useState, useEffect, useContext } from "react";
// import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { UsersContext } from "../UsersContext";
import { Formik } from "formik";
import * as yup from "yup";
import At from "react-native-vector-icons/FontAwesome";
import Key from "react-native-vector-icons/FontAwesome5";

const userSchema = yup.object({
  email: yup.string().email().required("Email required"),
  password: yup.string().min(8).required("Password required"),
});

export default function LoginScreen({ navigation }) {
  const { login, token, firstName } = useContext(UsersContext);

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
    <SafeAreaView style={styles.login_container}>
      <Text style={styles.login_title}>Login</Text>

      <Formik
        validationSchema={userSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, actions) => {
          const userInput = values;
          login(userInput);
          // console.log(userInput);
          //   actions.resetForm();
        }}
      >
        {(props) => (
          <View style={styles.input_div}>
            <At
              name="at"
              size={20}
              color={"#fff"}
              style={{ position: "absolute", marginTop: 18 }}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Email"
              value={props.values.email}
              onChangeText={props.handleChange("email")}
              onBlur={props.handleBlur("email")}
            ></TextInput>
            <Text style={styles.errorText}>
              {props.touched.email && props.errors.email}
            </Text>
            <Key
              name="key"
              color={"#fff"}
              size={20}
              style={{ position: "absolute", marginTop: 95 }}
            />
            <TextInput
              style={styles.inputField}
              value={props.values.password}
              onChangeText={props.handleChange("password")}
              placeholder="Password"
              onBlur={props.handleBlur("password")}
            ></TextInput>
            <Text style={styles.errorText}>
              {props.touched.password && props.errors.password}
            </Text>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={props.handleSubmit}
            >
              <Text style={styles.loginBtn_text}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      {/* <View>
        <Text>
          {token && firstName ? `Hello ${firstName}` : "Not logged in"}
        </Text>
      </View> */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>X</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  login_container: {
    backgroundColor: "#32928c",
    alignItems: "center",
    height: 400,
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    flexGrow: 0,
    // borderStyle: "solid",
  },
  login_title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 32,
    alignSelf: "center",
    color: "#fff",
    top: 15,
    position: "absolute",
  },
  input_div: {
    marginTop: 20,
    width: 350,
  },
  inputField: {
    paddingLeft: 22,
    paddingVertical: 3,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    color: "black",
    marginTop: 10,
    fontSize: 18,
    fontFamily: "MontserratRegular",
  },
  loginBtn: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  loginBtn_text: {
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    color: "#32928c",
  },
  errorText: {
    fontSize: 17,
    color: "red",
    textAlign: "center",
    paddingVertical: 5,
    fontWeight: 600,
    fontFamily: "MontserratRegular",
  },
});
