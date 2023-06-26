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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      {favoriteCars?.length !== 0 ? (
        <PopularCars
          cars={favoriteCars}
          carsAmount={favoriteCars.length}
          title="Favorite Cars"
          viewAll={false}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
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
    </SafeAreaView>
  );
}
