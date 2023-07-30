import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const { width, height } = Dimensions.get("window");
import Timeline from "react-native-timeline-flatlist";

export default function Payment(props) {
  const { paymentValid, setPaymentValid } = useContext(UsersContext);
  const {
    moveToNextStepManually,
    item,
    brandLogo,
    selectedEndDate,
    selectedStartDate,
    totalDays,
    datesConfirmed,
  } = props;
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");

  useEffect(() => {
    if (datesConfirmed) {
      setFormattedStartDate(selectedStartDate?.toISOString()?.slice(0, 10));
      setFormattedEndDate(selectedEndDate?.toISOString()?.slice(0, 10));
    }
  }, [datesConfirmed]);

  // let formatted_start_date = selectedStartDate?.toISOString().slice(0, 10);
  // let formatted_end_date = selectedEndDate?.toISOString().slice(0, 10);

  const datesTimeline = [
    {
      title: "pickup date".toUpperCase(),
      description: formattedStartDate,
    },
    {
      title: "return date".toUpperCase(),
      description: formattedEndDate,
    },
  ];

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
    <View
      style={{
        paddingHorizontal: 15,
        width: width,
      }}
    >
      <Text style={styles.method_title}>Rent Details</Text>
      <View style={styles.car_info}>
        <View style={styles.image_view}>
          <Image
            style={{
              resizeMode: "contain",
              width: "90%",
              height: "100%",
              marginTop: 0,
              //   borderColor: "red",
              // borderRadius: 50,
            }}
            source={{
              uri: `${item.picture.toString()}`,
            }}
          />
        </View>
        <View style={styles.car_info_right}>
          <View>
            <Text style={styles.model}>
              {item.model} {item.year}
            </Text>
            <Text style={styles.brand}>{item.brand}</Text>
            {/* <Text style={styles.model}>{item.year}</Text> */}
          </View>
        </View>
      </View>
      {datesConfirmed && (
        <View style={{ marginTop: 10 }}>
          <Timeline
            data={datesTimeline}
            showTime={false}
            circleColor="#32928c"
            innerCircle="dot"
            lineColor="#32928c"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  method_view: {
    // marginTop: 40,
    marginVertical: 20,
    marginHorizontal: 15,
    // minWidth: "100%",
  },
  method_title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
    // marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 2,
  },
  payment_method_view: {
    // margin,
  },
  payment_method_text: {
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
    marginTop: 10,
  },
  car_info: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#32928c",
    padding: 0,
    gap: 8,
    // borderRadius: 5,
    // borderBottomWidth: 1,
    // paddingBottom: 10,
    // borderColor: "gray",
    // backgroundColor: "#F2F5F7",
  },
  car_info_right: {
    height: "100%",
    marginTop: 15,
    gap: 4,
    // width: "50%",
    // alignItems: "center",
    // justifyContent: "space-around",
    // borderWidth: 1,
    // borderColor: "yellow",
  },
  image_view: {
    //width: "55%",
    width: 100,
    height: "100%",
    height: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "lightgray",
    marginTop: 15,
    backgroundColor: "#FFF",
    elevation: 5,
    // borderColor: "lightblue",
  },
  brand: {
    // fontFamily: "MontserratSemiBold",
    // fontSize: 18,
    fontFamily: "MontserratRegular",
    fontSize: 16,
    letterSpacing: 0.9,
  },
  model: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
  },
  date_view: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  date_title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
  },
});
