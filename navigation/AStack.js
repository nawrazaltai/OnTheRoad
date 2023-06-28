import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from "../screens/Home";
import TabNavigator from "./TabNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: { marginLeft: -25, fontSize: 18, color: "#fff" },
        drawerActiveBackgroundColor: "#32928c",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: () => (
            <FontAwesome name="home" size={30} color={"orange"} />
          ),
        }}
      />
      {/* <Stack.Screen name="Home" component={Home}></Stack.Screen> */}
    </Drawer.Navigator>
  );
}
