import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from "../screens/Home";
import TabNavigator from "./TabNavigator";

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator}></Stack.Screen>
      {/* <Stack.Screen name="Home" component={Home}></Stack.Screen> */}
    </Stack.Navigator>
  );
}
