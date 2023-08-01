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
import Modal from "react-native-modal";

export default function Test() {
  const navigation = useNavigation();
  const { email, firstName, lastName } = useContext(UsersContext);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal
        isVisible={isModalVisible}
        animationInTiming={750}
        animationOutTiming={800}
        onBackdropPress={toggleModal}
      >
        <View
          style={{
            width: 300,
            height: 300,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            alignSelf: "center",
          }}
        >
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// export { CheckoutScreen };
