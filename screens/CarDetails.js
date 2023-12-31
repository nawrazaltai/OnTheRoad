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
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Payment from "./CompleteRentScreen";

export default function CarDetails({ navigation, route }) {
  const { likes, handleLikeEvent, resetLikes } = useContext(UsersContext);

  const { item } = route?.params;
  //   console.log(item);

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
      <View style={styles.image_view}>
        <TouchableOpacity
          style={styles.go_back_btn}
          onPress={() => navigation.goBack()}
        >
          <IonIcons name="chevron-back" color="gray" size={15} />
        </TouchableOpacity>
        <Image
          style={{
            resizeMode: "contain",
            width: "100%",
            height: 180,
            marginTop: 0,
          }}
          source={{
            uri: `${item.picture.toString()}`,
          }}
        />
      </View>

      <View style={styles.info_view}>
        <ScrollView
          //   horizontal={false}
          style={{
            paddingHorizontal: 18,
            paddingVertical: 15,
          }}
        >
          <Text style={styles.car_name}>
            {item.brand.toUpperCase()} {item.model}
          </Text>
          <TouchableOpacity
            style={styles.hearts_view}
            onPress={() => handleLikeEvent(item.id)}
          >
            {likes?.includes(item.id) ? (
              <FontAwesome name={"heart"} size={15} color={"red"} />
            ) : (
              <FontAwesome name={"heart-o"} size={15} />
            )}
          </TouchableOpacity>
          <Text style={styles.year}>{item.year}</Text>
          <Text style={styles.spec}>Specifications</Text>
          <View>
            <ScrollView style={styles.spec_cards_view} horizontal={true}>
              <View style={styles.spec_card}>
                <MaterialCommunityIcons
                  name="car-multiple"
                  color="black"
                  size={29}
                />
                <Text style={styles.card_text}>{item.type}</Text>
              </View>

              <View style={styles.spec_card}>
                {item.fuel == "Electric" ? (
                  <MaterialCommunityIcons
                    name="car-electric"
                    size={29}
                    color={"black"}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="gas-station"
                    color="black"
                    size={30}
                  />
                )}
                <Text style={styles.card_text}>{item.fuel}</Text>
              </View>
              <View style={styles.spec_card}>
                <MaterialCommunityIcons
                  name="car-shift-pattern"
                  color="black"
                  size={29}
                />
                <Text style={styles.card_text}>
                  {item.gear == "Automatic" ? item.gear.slice(0, 4) : item.gear}
                </Text>
              </View>
              <View style={styles.spec_card}>
                <MaterialCommunityIcons
                  name="air-conditioner"
                  color="black"
                  size={29}
                />
              </View>
              <View style={styles.spec_card}>
                <MaterialCommunityIcons
                  name="car-seat"
                  color="black"
                  size={29}
                />
                <Text style={styles.card_text}>{item.seats}</Text>
              </View>

              <View style={styles.spec_card}>
                <MaterialCommunityIcons
                  name="car-door"
                  color="black"
                  size={29}
                />
                <Text style={styles.card_text}>{item.doors}</Text>
              </View>
              <View style={styles.spec_card}>
                <IonIcons name="speedometer" color="black" size={29} />
                <Text style={styles.card_text}>{item.top_speed}km/h</Text>
              </View>
            </ScrollView>

            <View>
              <Text style={styles.spec}>Description</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.price_view}>
        <Text style={styles.footer_price_text}>${item.price_per_day}/day</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Payment", { item })}
          style={styles.rent_now_btn}
        >
          <Text style={styles.rent_now_text}>Rent Now</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    minHeight: "100%",
    backgroundColor: "#F2F5F7",
    backgroundColor: "white",
  },
  image_view: {
    backgroundColor: "#FFF",
    // backgroundColor: "#333",
    height: "35%",
    alignItems: "center",
    justifyContent: "center",
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  go_back_btn: {
    position: "absolute",
    left: 20,
    top: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
  },
  info_view: {
    position: "absolute",
    // paddingHorizontal: 18,
    // paddingVertical: 15,
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    height: "70%",
    backgroundColor: "#EEEEEE",
  },
  car_name: {
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
    width: "85%",
  },
  year: {
    fontFamily: "MontserratRegular",
    fontSize: 18,
  },
  spec: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    marginTop: 20,
  },
  spec_card: {
    width: 75,
    height: 70,
    backgroundColor: "#FFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  card_text: {
    fontFamily: "MontserratRegular",
    fontSize: 13,
  },
  spec_cards_view: {
    marginTop: 10,
  },
  description: {
    fontFamily: "MontserratRegular",
    fontSize: 16.25,
    color: "black",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  hearts_view: {
    position: "absolute",
    right: 5,
    top: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    width: 40,
    height: 40,
  },
  price_view: {
    backgroundColor: "#32928c",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    // borderRadius: 20,
  },
  footer_price_text: {
    fontFamily: "MontserratRegular",
    fontSize: 22,
    color: "white",
    letterSpacing: 1.2,
  },
  rent_now_btn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "orange",
  },
  rent_now_text: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    color: "#fff",
  },
});
