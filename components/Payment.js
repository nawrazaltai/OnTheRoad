import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UsersContext } from "../UsersContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CarDetails from "../screens/CarDetails";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const { width, height } = Dimensions.get("window");
import { useStripe } from "@stripe/stripe-react-native";
import ModalWrapper from "./ModalWrapper";

export default function Payment(props) {
  const navigation = useNavigation();
  const {
    email,
    firstName,
    lastName,
    car_booking,
    userId,
    isModalVisible,
    toggleModal,
  } = useContext(UsersContext);
  const {
    moveToNextStepManually,
    item,
    brandLogo,
    selectedEndDate,
    selectedStartDate,
    selectedDays,
    totalDays,
    datesConfirmed,
  } = props;
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentValid, setPaymentValid] = useState(null);
  const [message, setMessage] = useState("");

  // const [loading, setLoading] = useState(false);
  publishableKey =
    "pk_test_51NXi92K0mqoNcqHyu3eQUYhp3nvukXdbxYhztnK5x1mgrZKVhXRgrBPXvyRu1iOSmzkChUuxsXYba65pymGeMeNt00pMVc02rY";
  const userFullName = firstName + " " + lastName;
  const [totalPrice, setTotalPrice] = useState(1);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`http://10.0.2.2:4000/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        fullName: userFullName,
        price: totalPrice * 100,
      }),
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: userFullName,
      },
    });
    // if (!error) {
    //   setLoading(true);
    // }
  };

  const openPaymentSheet = async () => {
    let booking;
    const { error } = await presentPaymentSheet();
    booking = {
      car_id: item.id,
      start_date: selectedStartDate.toISOString().slice(0, 10),
      end_date: selectedEndDate.toISOString().slice(0, 10),
      total_days: totalDays,
      total_price: totalPrice,
      renter: userId,
    };

    if (error) {
      if (error.code === "Canceled") {
        return;
      } else {
        navigation.navigate("Home", { message: "Fail" });
        toggleModal(!isModalVisible);
      }
      // navigation.navigate("Home", { message: "Fail" });
      // toggleModal(!isModalVisible);
    } else {
      // navigation.navigate("Home", { message: "Success" });
      // toggleModal(!isModalVisible);
      car_booking(booking, selectedDays);
      navigation.navigate("Confirming", { message: "Success" });
    }
  };

  useEffect(() => {
    if (datesConfirmed) {
      setFormattedStartDate(selectedStartDate?.toISOString()?.slice(0, 10));
      setFormattedEndDate(selectedEndDate?.toISOString()?.slice(0, 10));
      setTotalPrice(item.price_per_day * totalDays);
    }
  }, [datesConfirmed]);

  useEffect(() => {
    initializePaymentSheet();
  }, [totalPrice]);

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
    <View
      style={{
        paddingHorizontal: 15,
        borderTopRightRadius: 22,
        borderTopLeftRadius: 22,
        backgroundColor: "#EAEAEA",
        // backgroundColor: "#fff",
        marginTop: 5,
        height: height,
        width: width,
        borderWidth: 1,
        borderColor: "lightgray",
      }}
    >
      <Text style={styles.method_title}>Rent Details</Text>
      <View style={styles.car_info}>
        <View style={styles.image_view}>
          <Image
            style={{
              resizeMode: "contain",
              width: "100%",
              height: "100%",
              marginTop: 0,
              backgroundColor: "#F2F5F7",
              // backgroundColor: "#EAEAEA",
              overflow: "hidden",
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
            <Text style={styles.model}>{item.model}</Text>
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.year}>{item.year}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 5,
                backgroundColor: item?.color?.includes(" ")
                  ? item?.color?.split(" ")[1].toLowerCase()
                  : item?.color?.toLowerCase(),
              }}
            ></View>
            <Text
              style={{
                fontFamily: "MontserratRegular",
                color: "#F2F5F7",
                color: "#333",
                fontSize: 15,
              }}
            >
              {item?.color}
            </Text>
          </View>
        </View>
      </View>
      {datesConfirmed && (
        <View
          style={{
            marginTop: 10,
            gap: 20,
            // borderTopColor: "lightgray",
            // borderTopWidth: 1,
            paddingTop: 10,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            paddingBottom: 15,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                backgroundColor: "#F2F5F7",
                elevation: 2,
                width: 35,
                height: 35,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name={"car-arrow-right"}
                size={30}
                color={"#333"}
              />
            </View>
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                fontSize: 16,
                color: "#F2F5F7",
                color: "#333",
              }}
            >
              Pickup:
            </Text>
            <Text
              style={{
                fontFamily: "MontserratRegular",
                fontSize: 16,
                color: "#F2F5F7",
                color: "#333",
              }}
            >
              {selectedStartDate?.toString().slice(0, 3) +
                " " +
                selectedStartDate?.toISOString().slice(0, 10)}
              .
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <View
              style={{
                backgroundColor: "#F2F5F7",
                elevation: 2,
                width: 35,
                height: 35,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name={"car-arrow-left"}
                size={30}
                color={"#333"}
              />
            </View>
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                fontSize: 16,
                color: "#F2F5F7",
                color: "#333",
              }}
            >
              Return:
            </Text>
            <Text
              style={{
                fontFamily: "MontserratRegular",
                fontSize: 16,
                color: "#F2F5F7",
                color: "#333",
              }}
            >
              {selectedEndDate?.toString().slice(0, 3) +
                " " +
                selectedEndDate?.toISOString().slice(0, 10)}
              .
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                backgroundColor: "#F2F5F7",
                elevation: 2,
                width: 35,
                height: 35,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name={"calendar-check-outline"}
                size={30}
                color={"#333"}
              />
            </View>
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                fontSize: 16,
                color: "#F2F5F7",
                color: "#333",
              }}
            >
              Total rent days:
            </Text>
            <Text
              style={{
                fontFamily: "MontserratRegular",
                fontSize: 16,
                color: "#F2F5F7",
                color: "#333",
              }}
            >
              {totalDays > 1
                ? totalDays + " " + "days"
                : totalDays + " " + "day"}
              .
            </Text>
          </View>
        </View>
      )}
      {datesConfirmed && (
        <View style={{ paddingTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              borderBottomWidth: 1,
              borderBottomColor: "lightgray",
            }}
          >
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                fontSize: 18,
                color: "#F2F5F7",
                color: "#333",
                paddingBottom: 12,
              }}
            >
              Total price:
            </Text>
            <Text
              style={{
                fontFamily: "MontserratRegular",
                fontSize: 18,
                color: "#F2F5F7",
                color: "#333",
                paddingBottom: 12,
              }}
            >
              ${totalPrice}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#32928c",
              marginTop: 15,
              paddingVertical: 14,
              alignItems: "center",
              borderRadius: 3,
            }}
            onPress={() => {
              setPaymentValid(true);
              openPaymentSheet();
              // testModal;
            }}
          >
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                fontSize: 16,
                color: "#FFF",
              }}
            >
              Proceed to payment.
            </Text>
          </TouchableOpacity>
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
    color: "#333",
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
    borderTopColor: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 20,
    gap: 8,
    // borderRadius: 5,
    // borderBottomWidth: 1,
    // paddingBottom: 10,
    // borderColor: "gray",
    // backgroundColor: "#F2F5F7",
  },
  car_info_right: {
    height: 120,
    marginTop: 5,
    gap: 8,
    justifyContent: "space-evenly",
    // width: "50%",
    // alignItems: "center",
    // borderWidth: 1,
    // borderColor: "yellow",
  },
  image_view: {
    //width: "55%",
    width: 110,
    height: "100%",
    height: 110,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "lightgray",
    marginTop: 15,
    backgroundColor: "#FFF",
    elevation: 5,
    overflow: "hidden",
    // borderColor: "lightblue",
  },
  brand: {
    // fontFamily: "MontserratSemiBold",
    // fontSize: 18,
    fontFamily: "MontserratRegular",
    fontSize: 16,
    letterSpacing: 0.9,
    color: "#F2F5F7",
    color: "#333",
  },
  model: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    color: "white",
    color: "#333",
  },
  year: {
    fontFamily: "MontserratRegular",
    fontSize: 15,
    letterSpacing: 0.9,
    color: "#F2F5F7",
    color: "#333",
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
