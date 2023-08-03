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
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";

export default function ModalWrapper({
  children,
  title,
  bottomText,
  backgroundColor,
  navigateTo,
  animation,
}) {
  const navigation = useNavigation();
  const { email, firstName, lastName, isModalVisible, toggleModal } =
    useContext(UsersContext);

  useEffect(() => {
    console.log(animation);
  }, []);
  //   const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView>
      {/* <Button title="Show modal" onPress={toggleModal} /> */}

      <Modal
        isVisible={isModalVisible}
        animationInTiming={750}
        animationOutTiming={800}
        onBackdropPress={toggleModal}
      >
        <View
          style={{
            width: 320,
            height: 480,
            // padding: 30,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 10,
            backgroundColor: backgroundColor,
            borderWidth: 3,
            borderColor: "white",
            zIndex: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 27,
              fontFamily: "MontserratRegular",
            }}
          >
            {title}
          </Text>
          <LottieView
            // source={require("../assets/checkmark.json")}
            source={animation}
            autoPlay
            loop={false}
            speed={0.75}
            style={{ alignSelf: "center", height: 230 }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontFamily: "MontserratRegular",
              paddingHorizontal: 20,
              textAlign: "center",
              // textAlign: "center",
            }}
          >
            {bottomText}
          </Text>

          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: "#fff",
              paddingHorizontal: 25,
              paddingVertical: 12,
              borderRadius: 30,
            }}
            onPress={() => {
              navigation.navigate(navigateTo);
              toggleModal(false);
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "MontserratRegular",
                color: backgroundColor,
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
