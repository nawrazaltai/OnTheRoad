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
import LocationIcon from "react-native-vector-icons/Ionicons";
import UserCircle from "react-native-vector-icons/FontAwesome";
import MenuIcon from "react-native-vector-icons/Ionicons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import SearchIcon from "react-native-vector-icons/Ionicons";

export default function PopularCars() {
  const { allCars } = useContext(UsersContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_view}>
        <Text style={styles.title}>Popular Cars</Text>
        <TouchableOpacity style={styles.view_all_btn}>
          <Text style={styles.view_all_btn_text}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal={true}
        // width: 360,
      >
        <FlatList
          //   numColumns={3}
          data={allCars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  margin: 10,
                  width: 365,
                  height: 230,
                  backgroundColor: "white",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,
                  borderRadius: 10,
                  elevation: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  //   flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    resizeMode: "contain",
                    width: 300,
                    height: 120,
                  }}
                  source={{
                    uri: `${item.picture.toString()}`,
                  }}
                />
                <View style={styles.car_info}>
                  <Text style={styles.car_brand}>
                    {item.brand.toUpperCase()} {item.model}
                  </Text>
                  <Text style={styles.car_price}>
                    {item.price_per_day}$/Day
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 0,
  },
  top_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
  },
  view_all_btn_text: {
    paddingRight: 8,
    fontSize: 14,
    color: "gray",
  },
  car_info: {
    // alignItems: "flex-start",
    flex: 1,
    marginLeft: 15,
    marginTop: 10,
    paddingHorizontal: 2,
    gap: 8,
    // justifyContent: "center",
  },
  car_brand: {
    fontWeight: 600,
    fontSize: 24,
  },
  car_price: {
    fontWeight: 400,
    fontSize: 17,
  },
});
