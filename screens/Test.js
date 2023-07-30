import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ScrollView,
  Screen,
  Alert,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UsersContext } from "../UsersContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import CalendarPicker from "react-native-calendar-picker";
import StepIndicator from "react-native-step-indicator";
import Swiper from "react-native-swiper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Payment from "../components/Payment";
import Calendar from "../components/Calendar";
import { StripeProvider } from "@stripe/stripe-react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { CardField, useStripe } from "@stripe/stripe-react-native";

// function CheckoutScreen() {}

export default function Test() {
  const navigation = useNavigation();
  const { email, firstName, lastName } = useContext(UsersContext);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  publishableKey =
    "pk_test_51NXi92K0mqoNcqHyu3eQUYhp3nvukXdbxYhztnK5x1mgrZKVhXRgrBPXvyRu1iOSmzkChUuxsXYba65pymGeMeNt00pMVc02rY";
  const userFullName = firstName + " " + lastName;

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`http://10.0.2.2:4000/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, fullName: userFullName }),
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
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    // console.log("click");

    if (error) {
      // Alert.alert(`Error code: ${error.code}`, error.message);
      navigation.goBack();
    } else {
      Alert.alert("Thank you", "Your order is confirmed!");
      navigation.goBack();
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={{ alignSelf: "center", justifyContent: "center", flex: 1 }}>
      <Button
        variant="primary"
        disabled={!loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
    </View>
  );
}

// export { CheckoutScreen };
