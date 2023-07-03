import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
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
import Header from "../components/Header";

export default function FavoriteCars() {
  const { likes, favoriteCars } = useContext(UsersContext);

  const [loaded] = useFonts({
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratThin: require("../assets/fonts/Montserrat-Thin.ttf"),
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!loaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        // paddingHorizontal: 10,
        // backgroundColor: "white",
        backgroundColor: "#F2F5F7",
      }}
    >
      <Header />
      <View
        style={{
          flex: 1,
          // alignItems: "center",
          // justifyContent: "center",
          paddingHorizontal: 10,
          marginTop: -15,
          // backgroundColor: "#F2F5F7",
        }}
      >
        {favoriteCars?.length !== 0 ? (
          <PopularCars
            cars={favoriteCars}
            carsAmount={favoriteCars?.length}
            title="Favorite Cars"
            viewAll={false}
            clearAll="Clear All"
          />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              // flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "MontserratSemiBold",
                marginBottom: 0,
              }}
            >
              You currently have no favorite cars
            </Text>
            <Image
              style={{
                opacity: 0.2,
                height: 100,
                width: 250,
              }}
              source={require("../assets/4.png")}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
