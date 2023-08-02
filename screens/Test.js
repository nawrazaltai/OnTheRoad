import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Screen,
  Animated,
  Easing,
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
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";

// function AnimationWithImperativeApi() {
//   const animationRef = useRef(<LottieView />);

//   useEffect(() => {
//     animationRef.current?.play();

//     // Or set a specific startFrame and endFrame with:
//     animationRef.current?.play(30, 120);
//   }, []);

//   return (
//     <LottieView
//       ref={animationRef}
//       loop={false}
//       source={require("../assets/checkmark.json")}
//     />
//   );
// }

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

function ControllingAnimationProgress() {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <AnimatedLottieView
      source={require("../assets/checkmark.json")}
      progress={animationProgress.current}
    />
  );
}

export default function Test() {
  const navigation = useNavigation();
  const { email, firstName, lastName } = useContext(UsersContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrderConfirmed(!orderConfirmed);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isModalVisible]);

  return (
    <SafeAreaView>
      <Button title="Show modal" onPress={toggleModal} />
      {/* <Modal
        isVisible={isModalVisible}
        animationInTiming={750}
        animationOutTiming={800}
        onBackdropPress={toggleModal}
      >
        {!orderConfirmed ? (
          <View
            style={{
              width: 300,
              height: 350,
              // justifyContent: "center",
              // alignItems: "center",
              backgroundColor: "white",
              alignSelf: "center",
              flexDirection: "column",
              elevation: 4,
              backgroundColor: "#F2F5F7",
              backgroundColor: "#32928c",
              borderRadius: 10,
              padding: 20,
              borderWidth: 2,
              borderColor: "#fff",
            }}
          >
            <Text
              style={{
                fontWeight: 700,
                textAlign: "center",
                fontSize: 25,
                color: "#32928c",
                color: "#fff",
              }}
            >
              Confirming your order..
            </Text>
            <LottieView
              source={require("../assets/animation_test.json")}
              autoPlay
              loop={true}
              speed={0.55}
              style={{ alignSelf: "center" }}
            />
          </View>
        ) : (
          <View
            style={{
              width: 300,
              height: 380,
              // justifyContent: "center",
              // alignItems: "center",
              backgroundColor: "white",
              alignSelf: "center",
              flexDirection: "column",
              elevation: 4,
              backgroundColor: "#F2F5F7",
              backgroundColor: "#32928c",
              borderRadius: 10,
              padding: 20,
              borderWidth: 2,
              borderColor: "#fff",
            }}
          >
            <Text
              style={{
                fontWeight: 700,
                textAlign: "center",
                fontSize: 25,
                color: "#32928c",
                color: "#fff",
              }}
            >
              Order confirmed, thank you!
            </Text>
            <LottieView
              source={require("../assets/checkmark.json")}
              autoPlay
              loop={false}
              // speed={0.55}
              style={{ alignSelf: "center", height: 220 }}
            />

            <TouchableOpacity
              style={{
                // width: 90,
                // height: 45,
                paddingHorizontal: 30,
                paddingVertical: 12,
                borderRadius: 30,
                backgroundColor: "#FFF",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={toggleModal}
            >
              <Text
                style={{
                  fontWeight: 500,
                  color: "#32928c",
                  fontSize: 17,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal> */}

      <Modal
        isVisible={isModalVisible}
        animationInTiming={750}
        animationOutTiming={800}
        onBackdropPress={toggleModal}
      >
        {/* <AnimationWithImperativeApi /> */}
        <View
          style={{
            width: 300,
            height: 380,
            backgroundColor: "white",
            alignSelf: "center",
            borderRadius: 10,
          }}
        >
          <Text>Order confirmed!</Text>
          <ControllingAnimationProgress />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// export { CheckoutScreen };
