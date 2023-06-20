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

export default function TrendingBrands() {
  const { allCars } = useContext(UsersContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_view}>
        <Text style={styles.title}>Trending Brands</Text>
        <TouchableOpacity style={styles.view_all_btn}>
          <Text style={styles.view_all_btn_text}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal={true}

        // width: 360,
      >
        <FlatList
          numColumns={4}
          data={allCars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  margin: 10,
                  width: 90,
                  height: 90,
                  justifyContent: "center",
                  alignItems: "center",
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
                }}
              >
                {
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: 75,
                      height: 75,
                    }}
                    source={{
                      uri: `${item.logo_url.toString()}`,
                    }}
                  />
                }
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
    marginTop: 25,
    marginHorizontal: 8,
  },
  top_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});
