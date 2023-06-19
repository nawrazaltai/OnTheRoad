import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { UsersContext } from "../UsersContext";
import * as yup from "yup";
import UserIcon from "react-native-vector-icons/FontAwesome";
import At from "react-native-vector-icons/FontAwesome";
import Key from "react-native-vector-icons/FontAwesome5";
import Check from "react-native-vector-icons/AntDesign";
import Cross from "react-native-vector-icons/AntDesign";

let emails = [];
const userSchema = yup.object({
  firstName: yup.string().required("First name required"),
  lastName: yup.string().required("Last name required"),
  email: yup.string().email().required("Email required"),
  // email: yup
  //   .string()
  //   .email("Must be a valid email")
  //   .notOneOf(emails, "Already taken")
  //   .required("Email required")
  //   .test("IsValid", "already taken", async function (value) {
  //     const data = await fetch(`http://10.0.2.2:4000/userAvailable`, {
  //       method: "POST",
  //       mode: "cors",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ value }),
  //     });

  //     const res = await data.json();
  //     emails.push(res.hasUsers);
  //     return emails;
  //     //     // console.log(res);
  //     //     // (value) => value == true;
  //     //     // .then((res) => res.json())
  //     //     // .then((d) => console.log(d));
  //     //     // .then((res) => res.json())
  //     //     // .then((d) => d.hasUsers !== undefined && emails.push(d.hasUsers));
  //     //     // .then((d) => d.hasUsers?.length > 0 && emails.push(d.hasUsers));
  //     //     // console.log("data", emails.hasUsers);
  //     //     // return true;
  //     //     // })
  //   }),
  password: yup.string().min(8).required("Password required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function SignUp({ navigation }) {
  const { registerUser } = useContext(UsersContext);

  const closeAndNavToLogin = () => {
    navigation.goBack();
    navigation.navigate("LoginScreen");
  };

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
    <View
      style={{
        height: 504,
        borderTopRightRadius: 22,
        borderTopLeftRadius: 22,
        width: "100%",
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
      }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.signup_title}>Sign Up</Text>
        <Formik
          validationSchema={userSchema}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values, actions) => {
            const newUser = values;
            registerUser(newUser);
            actions.resetForm();
          }}
        >
          {(props) => (
            <View style={styles.input_div}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <UserIcon
                  name="user"
                  size={20}
                  color={"#fff"}
                  style={styles.icon}
                />
                <TextInput
                  style={styles.inputField}
                  value={props.values.firstName}
                  onChangeText={props.handleChange("firstName")}
                  placeholder={"First Name*"}
                  onBlur={props.handleBlur("firstName")}
                ></TextInput>

                {props.values.firstName.length != 0 ? (
                  <Check name="check" size={10} color={"white"} />
                ) : props.errors.firstName && props.touched.firstName ? (
                  <Cross name="close" style={styles.errorIcon} />
                ) : (
                  ""
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <UserIcon
                  name="user"
                  size={20}
                  color={"#fff"}
                  style={styles.icon}
                />
                <TextInput
                  style={styles.inputField}
                  value={props.values.lastName}
                  onChangeText={props.handleChange("lastName")}
                  placeholder={"Last Name*"}
                  onBlur={props.handleBlur("lastName")}
                ></TextInput>
                {props.values.lastName.length != 0 ? (
                  <Check name="check" size={10} color={"white"} />
                ) : props.errors.lastName && props.touched.lastName ? (
                  <Cross name="close" style={styles.errorIcon} />
                ) : (
                  ""
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <At name="at" size={20} color={"#fff"} style={styles.icon} />
                <TextInput
                  style={styles.inputField}
                  value={props.values.email}
                  onChangeText={props.handleChange("email")}
                  placeholder={"Email*"}
                  onBlur={props.handleBlur("email")}
                ></TextInput>

                {/* <Text style={{ color: "red", fontSize: 18 }}>
                  {props.touched.email && props.errors.email}
                </Text> */}

                {props.values.email.length < 1 && !props.touched.email ? (
                  ""
                ) : (props.values.email.length > 0 &&
                    props.errors.email &&
                    props.touched.email) ||
                  (props.values.email.length < 1 &&
                    props.errors.email &&
                    props.touched.email) ? (
                  <Cross name="close" style={styles.errorIcon} />
                ) : (
                  <Check name="check" size={10} color={"white"} />
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // width: 0,
                }}
              >
                <Key name="key" color={"#fff"} size={18} style={styles.icon} />
                <TextInput
                  style={styles.inputField}
                  value={props.values.password}
                  onChangeText={props.handleChange("password")}
                  placeholder={"Password*"}
                  onBlur={props.handleBlur("password")}
                ></TextInput>

                {props.touched.password ||
                (props.values.password.length > 0 && props.errors.password) ? (
                  <Cross name="close" style={styles.errorIcon} />
                ) : props.values.password.length < 1 &&
                  !props.touched.password ? (
                  ""
                ) : (
                  <Check name="check" size={10} color={"white"} />
                )}

                {/* {props.values.password.length < 1 && !props.touched.password ? (
                  ""
                ) : (props.values.password.length > 0 &&
                    props.errors.password) ||
                  (props.touched.password && !props.values.password) ? (
                  <Cross name="close" style={styles.errorIcon} />
                ) : (
                  <Check name="check" size={10} color={"white"} />
                )} */}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // width: 0,
                }}
              >
                <Key name="key" color={"#fff"} size={18} style={styles.icon} />
                <TextInput
                  style={styles.inputField}
                  value={props.values.confirmPassword}
                  onChangeText={props.handleChange("confirmPassword")}
                  placeholder={"Repeat Password*"}
                  onBlur={props.handleBlur("confirmPassword")}
                ></TextInput>
                {(props.values.confirmPassword.length < 1 &&
                  !props.touched.confirmPassword) ||
                (props.values.confirmPassword.length < 8 &&
                  props.touched.confirmPassword) ? (
                  ""
                ) : props.values.confirmPassword.length > 0 &&
                  props.errors.confirmPassword &&
                  props.values.confirmPassword !== props.values.password ? (
                  <Cross name="close" style={styles.errorIcon} />
                ) : (
                  <Check name="check" size={10} color={"white"} />
                )}
              </View>

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={props.handleSubmit}
              >
                <Text style={styles.btnText}>Register</Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 8,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    width: 150,
                    backgroundColor: "#fff",
                    height: 1,
                  }}
                ></View>
                <Text style={{ color: "#fff", fontSize: 14 }}>or</Text>
                <View
                  style={{ width: 150, backgroundColor: "#fff", height: 1 }}
                ></View>
              </View>
              <TouchableOpacity
                style={styles.login_btn}
                onPress={closeAndNavToLogin}
              >
                <Text style={styles.loginBtn_text}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>X</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#32928c",
    alignItems: "center",
    height: 500,
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    flexGrow: 0,
    // borderStyle: "solid",
    // flex: 1,
    // borderWidth: 2,
    // borderColor: "red",
    // alignItems: "center",
  },
  signup_title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 31,
    alignSelf: "center",
    color: "#fff",
    top: 2,
    position: "absolute",
  },

  input_div: {
    marginTop: 15,
    width: 330,
    gap: 7,
  },
  icon: {
    position: "absolute",
    bottom: 8,
  },
  inputField: {
    paddingLeft: 21,
    paddingVertical: 3,
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
    color: "black",
    marginTop: 10,
    width: "100%",
    fontSize: 18,
    fontFamily: "MontserratRegular",
  },
  submitBtn: {
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  login_btn: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#32928c",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fff",
  },
  loginBtn_text: {
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    color: "#fff",
  },
  btnText: {
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    color: "#32928c",
  },
  errorIcon: {
    position: "absolute",
    right: 2,
    color: "red",
    fontSize: 16,
  },
});
