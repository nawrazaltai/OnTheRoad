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

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.09;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function MapScreen() {
  const { lat, long, city, getAddress, countryCode } = useContext(UsersContext);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mode, setMode] = useState("DRIVING");
  const [modeId, setModeId] = useState(0);
  const [currentAddress, setCurrentAddress] = useState("");
  const [origin, setOrigin] = useState("");

  const location_ref = useRef();

  const modes = [
    {
      id: 0,
      mode: "DRIVING",
      icon: "car",
    },
    {
      id: 1,
      mode: "WALKING",
      icon: "walk",
    },
    {
      id: 2,
      mode: "TRANSIT",
      icon: "bus",
    },
  ];

  const INITIAL_POSITION = {
    latitude: lat,
    longitude: long,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const DESTINATION = {
    latitude: 25.233933,
    longitude: 55.264989,
    address: "17B Street 10, Jumeirah",
  };

  const setLocation = async () => {
    const loc = await Location.reverseGeocodeAsync({
      latitude: INITIAL_POSITION.latitude,
      longitude: INITIAL_POSITION.longitude,
    });
    setCurrentAddress(
      loc[0]?.street +
        " " +
        loc[0]?.streetNumber?.toString() +
        ", " +
        loc[0]?.district
    );
  };
  // useEffect(() => {
  //   console.log(location_ref.current?.getAddressText());
  // }, [location_ref.current]);

  useEffect(() => {
    setLocation();
  }, [INITIAL_POSITION]);

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
      <MapView
        inital
        style={styles.map}
        initialRegion={INITIAL_POSITION}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        scrollEnabled={true}
      >
        <Marker
          coordinate={INITIAL_POSITION}
          title="You are here!"
          description="This is your current position"
        ></Marker>
        <Marker coordinate={DESTINATION} pinColor={"#32928c"}>
          <Callout
            style={{
              height: 130,
              width: 150,
              flexDirection: "column",
              alignItems: "center",
              //   width: 100,
            }}
          >
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                textAlignVertical: "center",
              }}
            >
              OnTheRoad location
            </Text>
            <Text
              style={{
                height: "100%",
                // position: "relative",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                alignSelf: "center",
                bottom: 70,
              }}
            >
              <Image
                // resizeMode="cover"
                style={{
                  width: 150,
                  height: 120,
                }}
                source={logo}
              />
            </Text>
          </Callout>
        </Marker>
        <MapViewDirections
          origin={INITIAL_POSITION}
          destination={DESTINATION}
          apikey={"AIzaSyBY47Sdg05zygqBx2Z7LmNi3q5vtGB-mbw"}
          strokeColor="#32928c"
          mode={mode}
          language="en"
          timePrecision="now"
          strokeWidth={4}
          // onStart={(params) => {
          //   console.log(
          //     `Started routing between "${params.origin}" and "${params.destination}"`
          //   );
          // }}
          onReady={(result) => {
            // console.log(`Distance: ${result.distance} km`);
            setDistance(result.distance);
            setDuration(result.duration);
            // console.log(`Duration: ${result.duration} min.`);
            // console.log(duration);
          }}
        />
      </MapView>
      <View
        style={{
          position: "absolute",
          bottom: 70,
          height: 205,
          width: "100%",
          alignSelf: "center",
          flexDirection: "row",
          // alignItems: "center",
          // justifyContent: "center",
          backgroundColor: "#F2F5F7",
          backgroundColor: "#FFF",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            // height: "100%",
            // alignItems: "center",
            justifyContent: "space-around",
            paddingHorizontal: 10,
            overflow: "hidden",
            borderRightWidth: 1,
            borderRightColor: "#32928c",
            // marginVertical: 5,
            // backgroundColor: "#F2F5F7",
            // borderTopLeftRadius: 8,
            // borderBottomLeftRadius: 8,
            // borderRightWidth: 1,
          }}
        >
          {modes.map((mode, i) => {
            return (
              <TouchableOpacity
                style={
                  {
                    // borderWidth: 1,
                    // width: 30,
                    // alignItems: "center",
                    // borderRadius: 2,
                  }
                }
                key={mode.mode}
                onPress={() => {
                  setMode(mode.mode);
                  setModeId(mode.id);
                }}
              >
                <MaterialCommunityIcons
                  name={mode.icon}
                  size={24}
                  color={i === modeId ? "#32928c" : "gray"}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.directions_view}>
          <Text style={styles.directions_text}>
            <Text style={{ fontFamily: "MontserratSemiBold" }}>FROM: </Text>{" "}
            {currentAddress}
          </Text>
          <Text style={styles.directions_text}>
            <Text style={{ fontFamily: "MontserratSemiBold" }}>TO: </Text>{" "}
            {DESTINATION.address}{" "}
          </Text>
          <Text style={styles.directions_text}>
            <Text style={{ fontFamily: "MontserratSemiBold" }}>DISTANCE: </Text>{" "}
            {distance.toFixed(1)?.toString()} km
          </Text>
          <Text style={styles.directions_text}>
            <Text style={{ fontFamily: "MontserratSemiBold" }}>DURATION: </Text>{" "}
            {Math.round(duration)?.toString().slice(0, 3)} minutes
          </Text>
        </View>
      </View>
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
    width: Dimensions.get("window").width,
    // width: "100%",
    height: Dimensions.get("window").height,
  },
  directions_view: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "space-around",
    backgroundColor: "#FFF",
    // gap: 8,
    // width: ,
  },
  directions_text: {
    fontFamily: "MontserratRegular",
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
  },
});

// CODE BELOW IS IF WE WANT USER TO CHANGE STARTING POSITION
/* <View
        style={{
          position: "absolute",
          paddingVertical: 5,
          top: Constants.statusBarHeight,
          zIndex: 22,
          width: "90%",
          alignSelf: "center",
          backgroundColor: "white",
          shadowColor: "black",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.85,
          shadowRadius: 8,
          elevation: 5,
          borderRadius: 8,
          padding: 5,
        }}
      >
        <GooglePlacesAutocomplete
          enablePoweredByContainer={false}
          styles={{ textInput: styles.input }}
          fetchDetails={true}
          GooglePlacesSearchQuery={{ rankby: "distance" }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          ref={location_ref}
          placeholder="Change starting positon"
          query={{
            key: "AIzaSyBY47Sdg05zygqBx2Z7LmNi3q5vtGB-mbw",
            language: "en",
          }}
        />
      </View> */
