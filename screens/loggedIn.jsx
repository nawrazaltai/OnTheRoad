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

export default function LoggedInHomePage() {
  const { logout, firstName } = useContext(UsersContext);

  return (
    <View>
      <Text>Logged In as {firstName}</Text>
      <TouchableOpacity>
        <Text onPress={logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
