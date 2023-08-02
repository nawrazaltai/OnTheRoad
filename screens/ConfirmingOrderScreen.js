import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UsersContext } from "../UsersContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import CarDetails from "./CarDetails";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";
import ModalWrapper from "../components/ModalWrapper";

// const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

function LoadingCar() {
  const animationRef = useRef(<LottieView />);

  useEffect(() => {
    animationRef.current?.play();
    // Or set a specific startFrame and endFrame with:
    // animationRef.current?.play(30, 120);
  }, []);

  return (
    <LottieView
      ref={animationRef}
      speed={0.45}
      loop={true}
      source={require("../assets/animation_test.json")}
    />
  );
}

export default function ConfirmingOrder() {
  const navigation = useNavigation();
  const { isModalVisible, toggleModal } = useContext(UsersContext);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const [loaded] = useFonts({
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratThin: require("../assets/fonts/Montserrat-Thin.ttf"),
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrderConfirmed(true);
      toggleModal(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      toggleModal(false);
      navigation.navigate("Home");
    }, 30000);
    return () => clearTimeout(timer);
  }, [orderConfirmed]);

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#32928c",
        paddingVertical: 40,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "black",
          textAlign: "center",
          fontSize: 28,
          marginBottom: 280,
          fontFamily: "MontserratSemiBold",
        }}
      >
        Please wait while we confirm your order..
      </Text>
      <LoadingCar />
      {orderConfirmed && (
        <ModalWrapper
          title="Order confirmed!"
          animation={"../assets/checkmark.json"}
          bottomText="Thank you and enjoy your ride!"
          backgroundColor="#32928c"
          navigateTo="Home"
        ></ModalWrapper>
      )}
    </SafeAreaView>
  );
}
