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

export default function Payment() {
  const { paymentValid, setPaymentValid } = useContext(UsersContext);

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
    // console.log("TODAY", selectedStartDate);

    // getCars();
  }, []);

  if (!loaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <View style={styles.method_view}>
      <Text style={styles.method_title}>Payment</Text>
      <TouchableOpacity onPress={() => setPaymentValid(!paymentValid)}>
        <Text>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    minHeight: "100%",
    backgroundColor: "#F2F5F7",
    // backgroundColor: "white",
  },
  method_view: {
    marginVertical: 20,
    marginHorizontal: 12,
  },
  method_title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
  },
  disabled_confirm_btn: {
    backgroundColor: "lightgray",
    color: "gray",
    width: 80,
    height: 35,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "MontserratRegular",
  },
  confirm_btn: {
    backgroundColor: "#32928c",
    color: "#FFF",
    width: 80,
    height: 35,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "MontserratRegular",
  },
  cancel_btn: {
    backgroundColor: "#333",
    color: "#fff",
    borderWidth: 1,
    width: 80,
    height: 35,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "MontserratRegular",
  },
  confirm_error: {
    color: "red",
  },
  top_view: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 25,
    // marginBottom: 15,
  },
  complete_text_title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
  },
  go_back_btn: {
    position: "absolute",
    left: 20,
    top: -8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
  },
  car_info: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    // paddingBottom: 10,
    marginTop: 10,
    borderColor: "gray",
    // backgroundColor: "#F2F5F7",
  },
  car_info_left: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    alignItems: "flex-start",
    // borderWidth: 1,
    // borderColor: "yellow",
  },
  image_view: {
    width: "50%",
    height: "100%",
    // borderWidth: 1,
    // borderColor: "lightblue",
  },
  brand: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    paddingLeft: 5,
  },
});
