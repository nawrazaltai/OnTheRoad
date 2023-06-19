import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen1 from "../screens/OnboardingScreen1";
import OnboardingScreen2 from "../screens/OnboardingScreen2";
import OnboardingScreen3 from "../screens/OnboardingScreen3";
import LoginScreen from "../screens/LoginScreen";
import LoginOrSignup from "../screens/LoginOrSignupScreen";
import SignUp from "../screens/SignUpScreen";

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Onboarding1"
        component={OnboardingScreen1}
      ></Stack.Screen>
      <Stack.Screen
        name="Onboarding2"
        component={OnboardingScreen2}
      ></Stack.Screen>
      <Stack.Screen
        name="Onboarding3"
        component={OnboardingScreen3}
      ></Stack.Screen>
      <Stack.Screen
        name="LoginOrSignup"
        component={LoginOrSignup}
      ></Stack.Screen>
      <RootStack.Group
        screenOptions={{
          presentation: "containedTransparentModal",
          animation: "fade_from_bottom",
        }}
      >
        <RootStack.Screen
          name="LoginScreen"
          component={LoginScreen}
        ></RootStack.Screen>
        <RootStack.Screen name="SignUp" component={SignUp}></RootStack.Screen>
      </RootStack.Group>
    </Stack.Navigator>
  );
}
