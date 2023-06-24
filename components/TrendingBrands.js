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
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import PopularCars from "./PopularCars";

export default function TrendingBrands() {
  const navigation = useNavigation();
  const { allCars } = useContext(UsersContext);

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
    // getCars();
  }, []);

  if (!loaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_view}>
        <Text style={styles.title}>Trending Brands</Text>
        <TouchableOpacity style={styles.view_all_btn}>
          <Text style={styles.view_all_btn_text}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={true}>
        <FlatList
          numColumns={5}
          data={allCars.slice(0, 5)}
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
                onPress={() => {
                  navigation.navigate("CarsByBrand", { brand: item.brand });
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
