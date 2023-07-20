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
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

const PAGES = ["Page 1", <Payment />, <Calendar />, "Page 4", "Page 5"];
// const PAGES = [{component: "Page 1", stepStatus:  }, <Payment />, "Page 3", "Page 4", "Page 5"];

const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#fe7013",
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: "#fe7013",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#fe7013",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#fe7013",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fe7013",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#fe7013",
};

export default function Test() {
  const [currentPage, setCurrentPage] = useState(0);
  const { paymentValid, setPaymentValid } = useContext(UsersContext);

  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: "feed",
      color: stepStatus === "finished" ? "#ffffff" : "#fe7013",
      size: 15,
    };
    switch (position) {
      case 0: {
        iconConfig.name = "check";
        // } else {
        //   iconConfig.name = "shopping-cart";
        // }
        break;
      }
      case 1: {
        if (paymentValid && currentPage !== position) {
          //   stepStatus = "finished";
          iconConfig.name = "check";
        } else {
          iconConfig.name = "location-on";
        }
        break;
      }
      case 2: {
        if (paymentValid && currentPage !== position) {
          iconConfig.name = "check";
        } else {
          iconConfig.name = "assessment";
        }
        break;
      }
      case 3: {
        iconConfig.name = "payment";
        break;
      }
      case 4: {
        iconConfig.name = "track-changes";
        break;
      }
      default: {
        break;
      }
    }
    return iconConfig;
  };

  const onStepPress = (position, stepStatus) => {
    console.log(stepStatus);
    if (position == 0) {
      return;
    }
    setCurrentPage(position);
  };

  const renderViewPagerPage = (data) => {
    return (
      <View key={data} style={styles.page}>
        <Text>{data}</Text>
      </View>
    );
  };

  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );

  const renderLabel = ({ position, label, currentPosition }) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }
      >
        {label}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={firstIndicatorStyles}
          currentPosition={currentPage}
          labels={["Account", "Profile", "Band", "Membership", "Dashboard"]}
          renderLabel={renderLabel}
          onPress={onStepPress}
        />
      </View> */}
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={secondIndicatorStyles}
          currentPosition={currentPage}
          onPress={onStepPress}
          renderStepIndicator={renderStepIndicator}
          labels={[
            "Cart",
            "Delivery Address",
            "Order Summary",
            "Payment Method",
            "Track",
          ]}
        />
      </View>
      {/* <View style={styles.stepIndicator}>
        <StepIndicator
          stepCount={4}
          customStyles={thirdIndicatorStyles}
          currentPosition={currentPage}
          onPress={onStepPress}
          labels={["Approval", "Processing", "Shipping", "Delivery"]}
        />
      </View> */}
      <Swiper
        style={{ flexGrow: 1 }}
        loop={false}
        index={currentPage}
        autoplay={false}
        // pagingEnabled={false}
        scrollEnabled={false}
        showsPagination={false}
        // showsButtons
        onIndexChanged={(page) => {
          setCurrentPage(page);
        }}
      >
        {PAGES.map((page) => renderViewPagerPage(page))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  stepIndicator: {
    marginVertical: 50,
  },
  page: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  stepLabel: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#999999",
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#4aae4f",
  },
});
