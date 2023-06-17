import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState, useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  createStackNavigator,
} from "@react-navigation/native-stack";
import SignUp from "./screens/signUp";
import { UsersProvider } from "./UsersContext";
import { UsersContext } from "./UsersContext";
import AuthStack from "./navigation/AuthStack";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
export default function App() {
  const Stack = createNativeStackNavigator();

  // const {} = useContext(UsersContext);
  // console.log(firstName);

  return (
    <UsersProvider>
      <NavigationContainer>
        <StatusBar translucent />
        <AuthStack />
      </NavigationContainer>
    </UsersProvider>
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
