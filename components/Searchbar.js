import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UsersContext } from "../UsersContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import SearchIcon from "react-native-vector-icons/Ionicons";
import PopularCars from "./PopularCars";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Gear from "react-native-vector-icons/MaterialCommunityIcons";
import Gauge from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import CarDetails from "../screens/CarDetails";

export default function Searchbar() {
  const { allCars, likes, handleLikeEvent } = useContext(UsersContext);
  const [searchWord, setSearchWord] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const navigation = useNavigation();

  function search() {
    let res = [];
    allCars.filter((car) => {
      if (
        car.brand.toLowerCase().includes(searchWord.toLowerCase()) ||
        car.model.toLowerCase().includes(searchWord.toLowerCase())
      ) {
        res.push(car);
      }
    });
    return setFilteredCars(res);
  }

  useEffect(() => {
    search();
  }, [searchWord]);

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
    // getCars();
  }, []);

  if (!loaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <SafeAreaView style={styles.search_container}>
      <View style={styles.searchbar}>
        <SearchIcon name="search-sharp" size={28} color={"black"} />
        <TextInput
          style={styles.input_field}
          placeholder="Search for a car.."
          placeholderTextColor={"black"}
          value={searchWord}
          onChangeText={setSearchWord}
        ></TextInput>
        {searchWord.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setSearchWord(""), Keyboard.dismiss();
            }}
            style={styles.clear_btn}
          >
            <Text style={styles.clear_btn_text}>x</Text>
          </TouchableOpacity>
        )}
      </View>
      {searchWord.length != 0 && filteredCars.length != 0 && (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          style={styles.search_scrollview}
        >
          {filteredCars.map((item) => (
            <View
              style={{
                alignItems: "center",
                marginHorizontal: 10,
              }}
              key={item.id}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CarDetails", { item });
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  marginBottom: 15,
                  marginTop: 12,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => handleLikeEvent(item?.id)}
                  //   onPress={() => console.log(item.id)}
                  style={styles.heart_div}
                >
                  {likes?.includes(item?.id) ? (
                    <FontAwesome name="heart" size={18} color="red" />
                  ) : (
                    <FontAwesome name="heart-o" size={18} />
                  )}
                </TouchableOpacity>
                <Image
                  style={{
                    resizeMode: "contain",
                    width: 80,
                    height: 80,
                    borderRightWidth: 1,
                    borderColor: "red",
                  }}
                  source={{
                    uri: `${item?.picture?.toString()}`,
                  }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    marginLeft: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      // justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontFamily: "MontserratSemiBold" }}>
                      {item?.brand?.toUpperCase()} {item?.model}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontFamily: "MontserratRegular" }}>
                      {item?.year}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      marginTop: 10,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Gauge name={"speedometer"} size={20} />
                      <Text style={styles.top_speed}>
                        {item?.top_speed}km/h
                      </Text>
                    </View>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Gear name="car-shift-pattern" size={20} />
                      <Text style={styles.gear}>{item?.gear}</Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: "MontserratRegular",
                        }}
                      >
                        <Text style={styles.car_price}>
                          ${item?.price_per_day}
                        </Text>
                        /day
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search_container: {
    flex: 1,
    zIndex: 20,
    marginBottom: -10,
  },
  searchbar: {
    width: 370,
    height: 45,
    marginLeft: 5,
    borderWidth: 2,
    borderStyle: "solid",
    // borderColor: "gray",
    borderColor: "#32928c",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: -15,
    paddingLeft: 4,
    backgroundColor: "#FFF",
  },
  input_field: {
    fontSize: 18,
    paddingLeft: 4,
    width: "100%",
    fontFamily: "MontserratRegular",
  },
  clear_btn: {
    position: "absolute",
    right: 5,
    width: 22,
    height: 22,
    backgroundColor: "#32928c",
    borderRadius: 50,
    alignItems: "center",
  },
  clear_btn_text: {
    fontSize: 14,
    fontWeight: 500,
    color: "#fff",
  },
  search_scrollview: {
    width: "94%",
    marginLeft: 6,
    backgroundColor: "#32928c",
    // position: "absolute",
    flexGrow: 1,
    top: -1,
    overflow: "hidden",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    // paddingVertical: 10,
    // flexBasis: "auto",
    maxHeight: 300,
    flex: 1,
  },
  heart_div: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 30,
    height: 30,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    top: -10,
    left: -8,
    zIndex: 200,
  },

  car_price: {
    fontSize: 16,
    fontFamily: "MontserratSemiBold",
  },
});
