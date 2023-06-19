import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UsersContext } from "../UsersContext";
import * as Location from "expo-location";
import LocationIcon from "react-native-vector-icons/Ionicons";
import UserCircle from "react-native-vector-icons/FontAwesome";
import MenuIcon from "react-native-vector-icons/Ionicons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import SearchIcon from "react-native-vector-icons/Ionicons";

export default function Searchbar() {
  return (
    <View style={styles.searchbar}>
      <SearchIcon name="search-sharp" size={28} color={"black"} />
      <TextInput
        style={styles.input_field}
        placeholder="Search for a car here.."
        placeholderTextColor={"black"}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    width: 370,
    height: 45,
    marginLeft: 5,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "gray",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingLeft: 4,
  },
  input_field: {
    fontSize: 20,
    paddingLeft: 4,
  },
});
