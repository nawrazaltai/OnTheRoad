import { UsersContext, UsersProvider } from "../UsersContext";
import AuthStack from "./AuthStack";
import AppStack from "./AStack";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState, useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  createStackNavigator,
} from "@react-navigation/native-stack";

export default function AppNav() {
  const Stack = createNativeStackNavigator();

  const { token } = useContext(UsersContext);

  // return token !== null || token !== undefined ? <AppStack /> : <AuthStack />;
  return token ? <AppStack /> : <AuthStack />;

  {
    /* <AppStack />; */
  }
  // <NavigationContainer screenOptions={{ headerShown: false }}>
  // <UsersProvider>
  // </UsersProvider>
  // </NavigationContainer>
}
