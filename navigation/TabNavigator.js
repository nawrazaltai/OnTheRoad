import React, { useEffect, useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import FavoriteCars from "../screens/FavoriteCars";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import IonIcons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarDetails from "../screens/CarDetails";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import CarsByBrand from "../screens/CarsByBrand";
import { UsersContext } from "../UsersContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import ExploreScreen from "../screens/ExploreScreen";
import MyBookings from "../screens/MyBookings";
import FindTheShop from "../screens/FindTheShopScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import HistoryBookings from "../screens/HistoryBookings";
import Payment from "../screens/CompleteRentScreen";
import MapScreen from "../screens/MapScreen";
import Test from "../screens/Test";
import ConfirmingOrder from "../screens/ConfirmingOrderScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        // options={{ headerShown: false }}
        name="Home"
        component={Home}
      ></Stack.Screen>
      <Stack.Screen name="CarDetails" component={CarDetails}></Stack.Screen>
      <Stack.Screen name="CarsByBrand" component={CarsByBrand}></Stack.Screen>
      <Stack.Screen name="History" component={HistoryBookings}></Stack.Screen>
      <Stack.Screen name="Payment" component={Payment}></Stack.Screen>
      <Stack.Screen
        name="Confirming"
        component={ConfirmingOrder}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export const FindStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        // options={{ headerShown: false }}
        name="Find Us"
        component={FindTheShop}
      ></Stack.Screen>
      <Stack.Screen name="MapScreen" component={MapScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default function TabNavigator() {
  const { likes, favoriteCars } = useContext(UsersContext);

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
    <Tab.Navigator
      screenOptions={{
        // tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#32928c",
          height: 70,
          // borderTopColor: "orange",
          // borderTopWidth: 2,
          backgroundColor: "#32928c",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 10,
          marginTop: -12,
          fontFamily: "MontserratSemiBold",
        },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "orange",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={({ route }) => ({
          title: "Home",
          tabBarStyle: {
            height: 70,
            // borderTopColor: "orange",
            // borderTopWidth: 2,
            display: tabBarVisibility(route),
            backgroundColor: "#32928c",
          },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={30} color={color} />
          ),
        })}
      ></Tab.Screen>

      <Tab.Screen
        name="Explore"
        component={Test}
        options={({ route }) => ({
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <IonIcons name="compass-outline" size={30} color={color} />
          ),
        })}
      ></Tab.Screen>

      <Tab.Screen
        name="MyBookings"
        component={MyBookings}
        options={({ route }) => ({
          title: "My rentals",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="car-rental"
              size={36}
              color={color}
              style={{
                // marginBottom: 20,
                backgroundColor: "#32928c",
                textAlign: "center",
                textAlignVertical: "center",
                // borderWidth: 6,
                // borderColor: "#F2F5F7",
                // width: 72,
                // height: 72,
                borderRadius: 50,
                overflow: "visible",
              }}
            />
          ),
        })}
      ></Tab.Screen>

      <Tab.Screen
        name="Find"
        component={FindStack}
        options={({ route }) => ({
          title: "Find Us",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="location" size={25} color={color} />
          ),
        })}
      ></Tab.Screen>

      <Tab.Screen
        name="FavoriteCars"
        component={FavoriteCars}
        options={({ route }) => ({
          title: "Favorites",
          tabBarBadgeStyle: {
            display: likes?.length != 0 ? "flex" : "none",
            marginTop: 2,
            backgroundColor: "red",
            color: "#000",
            fontWeight: 500,
          },
          tabBarBadge: likes?.length > 0 ? likes.length : null,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="heart" size={25} color={color} />
          ),
        })}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

const tabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  //   console.log(routeName);

  if (routeName == "Home" || routeName == "CarsByBrand") {
    return "flex";
  }
  return "none";
};
