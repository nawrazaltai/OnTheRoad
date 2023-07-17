import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  createStackNavigator,
} from "@react-navigation/native-stack";
import { UsersContext, UsersProvider } from "./UsersContext";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import AppNav from "./navigation/AppNav";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <UsersProvider>
        <StatusBar translucent />
        <AppNav />
      </UsersProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // marginTop: 40,
    // justifyContent: "center",
  },
});
