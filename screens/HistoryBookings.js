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
import Header from "../components/Header";

export default function HistoryBookings() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text>My eariler Bookings</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 25,
    marginHorizontal: 10,
  },
  top_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "MontserratSemiBold",
  },
  view_all_btn_text: {
    paddingRight: 8,
    fontSize: 14,
    color: "gray",
    fontFamily: "MontserratRegular",
  },
});
