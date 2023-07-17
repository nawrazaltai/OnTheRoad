import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import logo from "../assets/4.png";
import shop from "../assets/location.jpg";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { SafeAreaView } from "react-native-safe-area-context";
import { UsersContext } from "../UsersContext";
import * as Location from "expo-location";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import MapScreen from "./MapScreen";

// import { GOOGLE_API_KEY } from "@env";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function FindTheShop() {
  const { lat, long, city, getAddress, countryCode } = useContext(UsersContext);
  const navigation = useNavigation();

  const INITIAL_POSITION = {
    latitude: 25.276987,
    longitude: 55.296249,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const DESTINATION = {
    latitude: 25.348766,
    longitude: 55.405403,
    address: "17B Street 10, Jumeirah",
  };

  // useEffect(() => {
  //   setLocation();
  // }, [INITIAL_POSITION]);

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
    <SafeAreaView>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
            borderBottomWidth: 2,
            marginHorizontal: 20,
            borderBottomColor: "#32928c",
          }}
        >
          {/* <Image source={logo} style={{ height: 100, width: 400 }} /> */}
          <Text
            style={{
              fontFamily: "MontserratSemiBold",
              fontSize: 32,
              color: "#333",
            }}
          >
            Find Us
          </Text>
        </View>
        <View>
          <View
            style={{
              marginTop: 10,
              borderRadius: 5,
              paddingHorizontal: 20,
              paddingVertical: 5,
              gap: 10,
            }}
          >
            <Image
              source={shop}
              style={{
                width: "100%",
                height: 280,
                resizeMode: "cover",
                borderRadius: 5,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#FFF",
              marginHorizontal: 20,
              marginVertical: 10,
              borderRadius: 5,
              overflow: "hidden",
              elevation: 2,
              gap: 20,
              paddingVertical: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 10,
                gap: 10,
              }}
            >
              <MaterialCommunityIcons
                name={"store-marker"}
                size={30}
                color={"#FFF"}
                style={{
                  backgroundColor: "#32928c",
                  width: 50,
                  height: 50,
                  textAlign: "center",
                  textAlignVertical: "center",
                  borderRadius: 10,
                }}
              />
              <Text style={styles.shop_info_text}>{DESTINATION.address}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 10,
                gap: 10,
              }}
            >
              <MaterialCommunityIcons
                name={"store-clock"}
                size={30}
                color={"#FFF"}
                style={{
                  backgroundColor: "#32928c",
                  width: 50,
                  height: 50,
                  textAlign: "center",
                  textAlignVertical: "center",
                  borderRadius: 10,
                }}
              />
              <Text style={styles.shop_info_text}>
                Open hours: 09:00 - 21:00
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 10,
                gap: 10,
              }}
            >
              <MaterialCommunityIcons
                name={"car-clock"}
                size={30}
                color={"#FFF"}
                style={{
                  backgroundColor: "#32928c",
                  width: 50,
                  height: 50,
                  textAlign: "center",
                  textAlignVertical: "center",
                  borderRadius: 10,
                }}
              />
              <Text style={styles.shop_info_text}>Pickup & return 24/7</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 10,
                gap: 10,
              }}
            >
              <MaterialCommunityIcons
                name={"phone"}
                size={30}
                color={"#FFF"}
                style={{
                  backgroundColor: "#32928c",
                  width: 50,
                  height: 50,
                  textAlign: "center",
                  textAlignVertical: "center",
                  borderRadius: 10,
                }}
              />
              <Text style={styles.shop_info_text}>(+971) 0123 456 78</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 10,
                gap: 10,
              }}
            >
              <MaterialCommunityIcons
                name={"email-multiple-outline"}
                size={30}
                color={"#FFF"}
                style={{
                  backgroundColor: "#32928c",
                  width: 50,
                  height: 50,
                  textAlign: "center",
                  textAlignVertical: "center",
                  borderRadius: 10,
                }}
              />
              <Text style={styles.shop_info_text}>ontheroad@mail.com</Text>
            </View>
          </View>
        </View>
        {!countryCode || countryCode !== "AE" ? (
          ""
        ) : (
          <>
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 10,
                borderTopColor: "#32928c",
                borderTopWidth: 1,
                paddingVertical: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: 22,
                  color: "#333",
                  paddingBottom: 2,
                }}
              >
                Find us on Google Maps
              </Text>
              <Text
                style={{
                  fontFamily: "MontserratRegular",
                  marginBottom: 10,
                  fontSize: 15,
                  letterSpacing: 1,
                  color: "#333",
                  lineHeight: 20,
                  // paddingHorizontal: 10,
                }}
              >
                Users currently located in the UAE are encouraged you to use the
                map below to check the distance between your current position to
                OnTheRoad's office.{" "}
              </Text>
            </View>

            <View
              style={{
                marginHorizontal: 10,
                borderRadius: 10,
                marginBottom: 10,
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MapScreen");
                }}
                style={{
                  backgroundColor: "#F2F5F7",
                  backgroundColor: "#32928c",
                  borderWidth: 1,
                  borderColor: "#3331",
                  borderRadius: 10,
                  elevation: 6,
                  width: 250,
                  height: 50,
                  position: "absolute",
                  zIndex: 100,
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingLeft: 8,
                  overflow: "hidden",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Entypo name="location" size={20} color={"#F2F5F7"} />
                  <Text
                    style={{
                      fontFamily: "MontserratRegular",
                      color: "#F2F5F7",
                      fontSize: 16,
                    }}
                  >
                    See on the map
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={17}
                  color={"#32928c"}
                  style={{
                    backgroundColor: "#F2F5F7",
                    alignSelf: "stretch",
                    width: 35,
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                />
              </TouchableOpacity>
              <MapView
                inital
                style={styles.map}
                initialRegion={INITIAL_POSITION}
                provider={PROVIDER_GOOGLE}
                zoomEnabled={true}
                scrollEnabled={true}
              ></MapView>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shop_info_text: {
    fontFamily: "MontserratSemiBold",
    color: "#333",
    color: "#F2F5F7",
    color: "#32928c",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    letterSpacing: 1.5,
    paddingLeft: 0,
    lineHeight: 25,
  },

  map: {
    width: "100%",
    height: 130,
    opacity: 0.8,
    alignSelf: "center",
  },
});
