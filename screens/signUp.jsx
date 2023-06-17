import { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";
import { Formik } from "formik";
import { UsersContext } from "../UsersContext";
import { useContext } from "react";
import * as yup from "yup";

const userSchema = yup.object({
  firstName: yup.string().required("First name required"),
  lastName: yup.string().required("Last name required"),
  email: yup.string().email().required("Email required"),
  password: yup.string().min(8).required("Password required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function SignUp() {
  const { registerUser } = useContext(UsersContext);

  return (
    <View>
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
          <View>
            <TextInput
              style={styles.inputField}
              value={props.values.firstName}
              onChangeText={props.handleChange("firstName")}
              placeholder="First Name"
              onBlur={props.handleBlur("firstName")}
            ></TextInput>
            <Text style={styles.errorText}>
              {props.touched.firstName && props.errors.firstName}
            </Text>
            <TextInput
              style={styles.inputField}
              value={props.values.lastName}
              onChangeText={props.handleChange("lastName")}
              placeholder="Last Name"
              onBlur={props.handleBlur("lastName")}
            ></TextInput>
            <Text style={styles.errorText}>
              {props.touched.lastName && props.errors.lastName}
            </Text>
            <TextInput
              style={styles.inputField}
              value={props.values.email}
              onChangeText={props.handleChange("email")}
              placeholder="Email"
              onBlur={props.handleBlur("email")}
            ></TextInput>
            <Text style={styles.errorText}>
              {props.touched.email && props.errors.email}
            </Text>
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

            <TextInput
              style={styles.inputField}
              value={props.values.confirmPassword}
              onChangeText={props.handleChange("confirmPassword")}
              placeholder="Repeat password"
              onBlur={props.handleBlur("confirmPassword")}
            ></TextInput>
            <Text style={styles.errorText}>
              {props.touched.confirmPassword && props.errors.confirmPassword}
            </Text>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={props.handleSubmit}
            >
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  inputField: {
    paddingRight: 20,
    paddingLeft: 4,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "darkgray",
    color: "black",
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: "#33a",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    fontWeight: 600,
    textAlign: "center",
    color: "white",
  },
  errorText: {
    fontWeight: 800,
    fontSize: 12,
    color: "red",
    textAlign: "center",
  },
});
