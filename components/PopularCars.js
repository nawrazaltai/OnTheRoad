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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CarDetails from "../screens/CarDetails";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AlphabetList from "react-native-flatlist-alphabet";

import Gear from "react-native-vector-icons/MaterialCommunityIcons";
import Gauge from "react-native-vector-icons/Ionicons";

export default function PopularCars({
  cars,
  title,
  viewAll,
  carsAmount,
  clearAll,
}) {
  const navigation = useNavigation();
  const { handleLikeEvent, likes, resetLikes } = useContext(UsersContext);
  //   console.log(cars);

  //   const myData = cars.map((car)=>(
  //   { value: car[0], key: car}
  //   ))

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
  }, []);

  if (!loaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_view}>
        {title.length !== 0 && <Text style={styles.title}>{title}</Text>}
        <TouchableOpacity
          onPress={() => resetLikes()}
          style={styles.view_all_btn}
        >
          {viewAll || clearAll ? (
            <Text style={styles.view_all_btn_text}>
              {viewAll
                ? "View All"
                : clearAll
                ? `${clearAll} (${likes?.length}) `
                : ""}
            </Text>
          ) : (
            ""
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal={true}
        // width: 360,
      >
        <FlatList
          //   numColumns={3}
          data={cars?.slice(0, carsAmount)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CarDetails", { item });
                }}
                // onPress={() => console.log(item)}
                style={{
                  margin: 10,
                  width: 365,
                  height: 260,
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
                <TouchableOpacity
                  onPress={() => handleLikeEvent(item?.id)}
                  //   onPress={() => console.log(item.id)}
                  style={styles.heart_div}
                >
                  {likes?.includes(item?.id) ? (
                    <FontAwesome name="heart" size={18} color="red" />
                  ) : (
                    <FontAwesome name="heart-o" size={18} />
                  )}
                </TouchableOpacity>
                <Image
                  style={{
                    resizeMode: "contain",
                    width: 240,
                    height: 120,
                    marginTop: 0,
                  }}
                  source={{
                    uri: `${item.picture?.toString()}`,
                  }}
                />
                <View style={styles.car_info}>
                  <Text style={styles.car_brand}>
                    {item.brand.toUpperCase()} {item.model}
                  </Text>
                  <Text style={styles.year}>{item.year}</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.bottom_div}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Gauge name={"speedometer"} size={20} />
                    <Text style={styles.top_speed}>{item.top_speed}km/h</Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Gear name="car-shift-pattern" size={20} />
                    <Text style={styles.gear}>{item.gear}</Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: "MontserratRegular",
                      }}
                    >
                      <Text style={styles.car_price}>
                        ${item.price_per_day}
                      </Text>
                      /day
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
      {/* <AlphabetList
      data={
        myData
      }
      renderItem={}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 10,
  },
  top_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    marginHorizontal: 10,
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
  line: {
    alignSelf: "center",
    width: "85%",
    height: 1,
    marginTop: 5,
    backgroundColor: "#32928c",
  },
  car_info: {
    alignSelf: "flex-start",
    // justifyContent: "center",
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 30,
  },
  car_brand: {
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
  },
  year: {
    fontSize: 14,
    fontWeight: 300,
    fontFamily: "MontserratRegular",
  },
  car_price: {
    fontSize: 20,
    fontFamily: "MontserratSemiBold",
    // color: "#32928c",
  },
  heart_div: {
    position: "absolute",
    top: 15,
    right: 20,
  },
  bottom_div: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  top_speed: {
    // marginRight: 1,
    fontSize: 13,
    marginLeft: 1,
    fontFamily: "MontserratRegular",
  },
  gear: {
    fontSize: 13,
    marginLeft: 1,
    fontFamily: "MontserratRegular",
  },
});
