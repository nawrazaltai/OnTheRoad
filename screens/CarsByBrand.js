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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UsersContext } from "../UsersContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import IonIcons from "react-native-vector-icons/Ionicons";
import PopularCars from "../components/PopularCars";

export default function CarsByBrand({ navigation, route }) {
  const { allCars } = useContext(UsersContext);
  const { brand } = route?.params;
  const [arr, setArr] = useState([]);

  const [loaded] = useFonts({
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratThin: require("../assets/fonts/Montserrat-Thin.ttf"),
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  let res;
  useEffect(() => {
    async function Prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    Prepare();
    BrandsArr();
    // console.log(allCars);
    // getCars();
  }, []);

  if (!loaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  function BrandsArr() {
    let copy = [...allCars];
    let res = copy.filter((car) => {
      return car.brand.toUpperCase() === brand.toUpperCase();
    });
    setArr(res);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.go_back_btn}
        onPress={() => navigation.goBack()}
      >
        <IonIcons name="chevron-back" color="gray" size={15} />
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>{brand.toUpperCase()}</Text>
      </View>
      <PopularCars
        cars={arr}
        title={""}
        carsAmount={arr.length}
        viewAll={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    marginHorizontal: 8,
    backgroundColor: "#F2F5F7",
  },
  go_back_btn: {
    // position: "absolute",
    left: 5,
    // top: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 34,
    letterSpacing: 1,
    marginTop: 10,
    fontFamily: "MontserratRegular",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    marginHorizontal: 15,
  },
});
