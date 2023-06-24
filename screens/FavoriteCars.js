import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UsersContext } from "../UsersContext";
import * as Location from "expo-location";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import PopularCars from "../components/PopularCars";

export default function FavoriteCars() {
  const { likes, favoriteCars } = useContext(UsersContext);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <PopularCars
        cars={favoriteCars}
        carsAmount={favoriteCars.length}
        title="Favorite Cars"
        viewAll={false}
      />
    </SafeAreaView>
  );
}
