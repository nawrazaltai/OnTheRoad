import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UsersContext } from "../UsersContext";
import * as Location from "expo-location";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CarDetails from "./CarDetails";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import IonIcons from "react-native-vector-icons/Ionicons";

export default function Explore() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <IonIcons name="menu-outline" size={38} color={"black"} />
        </TouchableOpacity>
      </View>
      <Text>Explore</Text>
    </SafeAreaView>
  );
}
