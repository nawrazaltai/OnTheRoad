import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
// import Home from "../screens/Home";
import TabNavigator from "./TabNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import FavoriteCars from "../screens/FavoriteCars";
import { HistoryStack } from "./TabNavigator";
import { HomeStack } from "./TabNavigator";

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import HistoryBookings from "../screens/HistoryBookings";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppStack() {
  const [loaded] = useFonts({
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratThin: require("../assets/fonts/Montserrat-Thin.ttf"),
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  useEffect(() => {
    async function Prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    Prepare();
  }, []);

  if (!loaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 18,
          fontFamily: "MontserratSemiBold",
          color: "#32928c",
        },
        drawerActiveBackgroundColor: "orange",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: () => (
            <FontAwesome name="home" size={30} color={"#32928c"} />
          ),
          drawerItemStyle: { marginTop: -20 },
        }}
      />
      <Drawer.Screen
        name="HistoryScreen"
        // initialParams={{ screen: "HistoryBookings" }}
        component={HistoryBookings}
        options={{
          title: "History",
          drawerIcon: () => (
            <FontAwesome name="heart" size={25} color={"#32928c"} />
          ),
          drawerItemStyle: { marginTop: 2 },
        }}
      />
      {/* <Drawer.Screen
        name="Favorites"
        component={FavoriteCars}
        options={{
          drawerIcon: () => (
            <FontAwesome name="heart" size={25} color={"orange"} />
          ),
          drawerItemStyle: { marginTop: 2 },
        }}
      /> */}
      {/* <Stack.Screen name="Home" component={Home}></Stack.Screen> */}
    </Drawer.Navigator>
  );
}
