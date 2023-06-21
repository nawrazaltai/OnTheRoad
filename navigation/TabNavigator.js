import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import FavoriteCars from "../screens/FavoriteCars";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarDetails from "../screens/CarDetails";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        // options={{ headerShown: false }}
        name="Home"
        component={Home}
      ></Stack.Screen>
      <Stack.Screen name="CarDetails" component={CarDetails}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#32928c",
          height: 80,
        },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "orange",
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: {
            display: tabBarVisibility(route),
            backgroundColor: "#32928c",
          },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        })}
      ></Tab.Screen>
      <Tab.Screen
        name="FavoriteCars"
        component={FavoriteCars}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="heart" size={size} color={color} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

const tabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (routeName == "CarDetails") {
    return "none";
  }
  return "flex";
};
