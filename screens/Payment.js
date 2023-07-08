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
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import CalendarPicker from "react-native-calendar-picker";

export default function Payment({ navigation, route }) {
  const { item } = route?.params;
  const { allBrands, car_booking, userId } = useContext(UsersContext);
  const [brandLogo, setBrandLogo] = useState("");
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  //   console.log(new Date().toLocaleString());
  //   let date = moment();
  // const today = date.format("DD/MM/YYYY");

  const [fetchedDisabledDates, setFetchedDisabledDates] = useState([]);
  async function FetchDisabledDates(car_id) {
    const result = await fetch("http://10.0.2.2:4000/bookings/dates", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ car_id }),
    }).then((res) => res.json());
    // console.log(result);
    let res = [];
    for (let i = 0; i < result.length; i++) {
      date = result[i].date;
      res.push(date);
    }
    setFetchedDisabledDates(res);
  }

  //   const [fetchedDisabledDates, setFetchedDisabledDates] = useState([
  //     "2023-07-10",
  //     "2023-07-11",
  //     "2023-07-12",
  //     "2023-07-13",
  //     "2023-07-14",
  //     "2023-07-15",
  //     "2023-07-19",
  //     "2023-08-24",
  //   ]);

  const [selectedStartDate, setSelectedStartDate] = useState(today);
  const [selectedEndDate, setSelectedEndDate] = useState(today);
  const [totalDays, setTotalDays] = useState(0);
  const [disabledConfirmBtn, setDisabledConfirmBtn] = useState(true);
  const [confirmError, setConfirmError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [datesConfirmed, setDatesConfirmed] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    findBrand();
    FetchDisabledDates(item.id);
  }, [route?.params]);

  function findBrand() {
    let res;
    allBrands.filter((brand) => {
      if (brand.brand == item.brand) {
        res = brand.url.toString();
      }
      return setBrandLogo(res);
    });
  }

  const days = (startDate, endDate) => {
    let totalDays;
    if (endDate == today || startDate == today) {
      totalDays = 0;
      setTotalDays(totalDays);
    } else {
      let difference = endDate - startDate;
      totalDays = Math.ceil(difference / (1000 * 3600 * 24) + 1);
      // console.log(totalDays);
      return setTotalDays(totalDays);
    }
  };

  useEffect(() => {
    days(selectedStartDate, selectedEndDate);
    totalDays < 1 ? setDisabledConfirmBtn(true) : setDisabledConfirmBtn(false);
  }, [selectedStartDate, selectedEndDate, totalDays]);
  //   console.log("total", totalDays);

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
    // console.log("TODAY", selectedStartDate);

    // getCars();
  }, []);

  if (!loaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  function onDateChange(date, type) {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  }

  function getPreviousDay(selected) {
    let nearestArr = [];
    for (let i = 0; i < fetchedDisabledDates.length; i++) {
      let date = new Date(fetchedDisabledDates[i]);
      if (date > selected) {
        nearestArr.push(date);
        break;
      }
    }
    let diff = Math.round((nearestArr[0] - selected) / (1000 * 60 * 60 * 24));
    return diff;
  }

  const onConfirm = () => {
    if (disabledConfirmBtn) {
      setConfirmError("Please select an end date");
    } else {
      console.log(totalDays);
      getDates(selectedStartDate, selectedEndDate);
      setDatesConfirmed(true);
      setModalVisible(false);
    }
  };

  function getDates(startDate, stopDate) {
    let dateArray = [];
    let res = [...fetchedDisabledDates];
    let currentDate = moment(startDate);
    let endDate = moment(stopDate);
    while (currentDate <= endDate) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
    res.push(...dateArray);
    setSelectedDays(dateArray);
    // setFetchedDisabledDates(res);
    // return dateArray;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_view}>
        <TouchableOpacity
          style={styles.go_back_btn}
          onPress={() => navigation.goBack()}
        >
          <IonIcons name="chevron-back" color="gray" size={15} />
        </TouchableOpacity>
        <Text style={styles.complete_text_title}>Complete your rent</Text>
      </View>

      <View style={styles.car_info}>
        <View style={styles.car_info_left}>
          <Image
            style={{
              resizeMode: "contain",
              //   width: "50%",
              width: 80,
              height: 60,
              marginTop: 0,
              marginLeft: 0,
              //   backgroundColor: "red",
            }}
            source={{
              uri: brandLogo,
            }}
          />
          <Text style={styles.brand}>{item.brand}</Text>
          <Text style={styles.model}>{item.model}</Text>
        </View>
        <View style={styles.image_view}>
          <Image
            style={{
              resizeMode: "contain",
              width: "100%",
              height: 120,
              marginTop: 0,
              //   borderColor: "red",
              // borderRadius: 50,
            }}
            source={{
              uri: `${item.picture.toString()}`,
            }}
          />
        </View>
      </View>

      {!datesConfirmed ? (
        <>
          <View style={styles.date_view}>
            <Text style={styles.date_title}>Select dates</Text>
          </View>
          <TouchableOpacity
            disabled={datesConfirmed}
            style={styles.open_calendar_btn}
            onPress={() => {
              setModalVisible(!modalVisible);
              setSelectedStartDate(today);
              setSelectedEndDate(today);
            }}
          >
            <Text style={{ fontFamily: "MontserratSemiBold" }}>{today}</Text>
            {modalVisible ? (
              <MaterialCommunityIcons
                name={"chevron-up"}
                color="black"
                size={22}
              />
            ) : (
              <MaterialCommunityIcons
                name={"chevron-down"}
                color="black"
                size={22}
              />
            )}
          </TouchableOpacity>

          {modalVisible && (
            <View
              style={{
                borderWidth: 1,
                width: "95%",
                marginLeft: 12,
                borderRadius: 5,
                marginTop: 4,
                backgroundColor: "#fff",
                padding: 10,
                zIndex: 10,
              }}
            >
              <CalendarPicker
                minDate={today}
                width={380}
                height={400}
                initialDate={today}
                allowRangeSelection={true}
                previousTitle="<<"
                nextTitle=">>"
                selectedDayColor="#32928c"
                onDateChange={onDateChange}
                maxRangeDuration={[
                  {
                    date: new Date(selectedStartDate),
                    maxDuration: getPreviousDay(new Date(selectedStartDate)),
                  },
                ]}
                disabledDates={fetchedDisabledDates}
              />

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  justifyContent: "center",
                  width: "100%",
                  gap: 15,
                  borderTopWidth: 2,
                  borderTopColor: "lightgray",
                  paddingTop: 10,
                }}
              >
                <TouchableOpacity
                  style={
                    disabledConfirmBtn
                      ? styles.disabled_confirm_btn
                      : styles.confirm_btn
                  }
                  onPress={() => onConfirm()}
                  // disabled={disabledConfirmBtn}
                >
                  <Text
                    style={
                      disabledConfirmBtn
                        ? styles.disabled_confirm_btn
                        : styles.confirm_btn
                    }
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancel_btn}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setSelectedStartDate(today);
                    setSelectedEndDate(today);
                  }}
                >
                  <Text style={styles.cancel_btn}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      ) : (
        <>
          <View style={styles.date_view}>
            <Text style={styles.date_title}>Selected dates</Text>
          </View>

          <View
            style={{
              //   borderWidth: 1,
              marginHorizontal: 10,
              borderRadius: 4,
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#FFF",
              height: 180,
              borderRadius: 10,
              elevation: 10,
              paddingHorizontal: 10,
              paddingBottom: 20,
              marginTop: -10,
              justifyContent: "space-between",
              borderWidth: 2,
              borderColor: "#32928c",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // backgroundColor: "#FFF",
                height: 120,
                // borderRadius: 10,
                // elevation: 10,
                // paddingHorizontal: 10,
                // marginTop: -10,
                // justifyContent: "space-between",
                // borderWidth: 2,
                // borderColor: "#32928c",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "MontserratRegular",
                  }}
                >
                  Pickup
                </Text>
                <MaterialCommunityIcons
                  name={"car-arrow-right"}
                  size={43}
                  color={"#32928c"}
                />

                <Text
                  style={{
                    fontFamily: "MontserratSemiBold",
                  }}
                >
                  {selectedStartDate.toISOString().slice(0, 10)}
                </Text>
              </View>

              <View
                style={{
                  width: 210,
                  borderBottomWidth: 2,
                  borderStyle: "dashed",
                  borderColor: "black",
                  alignItems: "center",
                  marginTop: -10,
                }}
              >
                {totalDays > 1 ? (
                  <Text
                    style={{
                      fontFamily: "MontserratSemiBold",
                      fontSize: 17,
                      paddingBottom: 2,
                    }}
                  >
                    {totalDays} days
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "MontserratSemiBold",
                      fontSize: 17,
                      paddingBottom: 2,
                    }}
                  >
                    {totalDays} day
                  </Text>
                )}
              </View>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "MontserratRegular",
                  }}
                >
                  Return
                </Text>

                <MaterialCommunityIcons
                  name={"car-arrow-left"}
                  size={43}
                  color={"#32928c"}
                />
                <Text
                  style={{
                    fontFamily: "MontserratSemiBold",
                  }}
                >
                  {" "}
                  {selectedEndDate?.toISOString().slice(0, 10)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setSelectedStartDate(today);
                setSelectedEndDate(today);
                setDatesConfirmed(false);
              }}
              style={{
                borderWidth: 1,
                width: "100%",
                alignItems: "center",
                paddingVertical: 8,
                borderRadius: 4,
                backgroundColor: "#FF6666",
              }}
            >
              <Text style={{ fontFamily: "MontserratSemiBold", color: "#000" }}>
                Cancel selected {totalDays > 1 ? "dates" : "date"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              //   console.log(
              //     "CAR_ID:",
              //     item.id,
              //     "START_DATE:",
              //     selectedStartDate.toISOString().slice(0, 10),
              //     "END_DATE:",
              //     selectedEndDate.toISOString().slice(0, 10),
              //     "TOTAL_DAYS:",
              //     totalDays,
              //     "TOTAL_PRICE: ",
              //     totalDays * item.price_per_day,
              //     "RENTER:",
              //     userId,
              //     "SELECTED_DAYS:",
              //     selectedDays
              //   );
              booking = {
                car_id: item.id,
                start_date: selectedStartDate.toISOString().slice(0, 10),
                end_date: selectedEndDate.toISOString().slice(0, 10),
                total_days: totalDays,
                total_price: totalDays * item.price_per_day,
                renter: userId,
              };
              car_booking(booking, selectedDays);
            }}
            style={{
              marginTop: 10,
              alignItems: "center",
              borderWidth: 2,
              width: 180,
              alignSelf: "center",
            }}
          >
            <Text>INSERT TEST</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    minHeight: "100%",
    backgroundColor: "#F2F5F7",
    // backgroundColor: "white",
  },

  disabled_confirm_btn: {
    backgroundColor: "lightgray",
    color: "gray",
    width: 80,
    height: 35,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "MontserratRegular",
  },
  confirm_btn: {
    backgroundColor: "#32928c",
    color: "#FFF",
    width: 80,
    height: 35,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "MontserratRegular",
  },
  cancel_btn: {
    backgroundColor: "#333",
    color: "#fff",
    borderWidth: 1,
    width: 80,
    height: 35,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "MontserratRegular",
  },
  confirm_error: {
    color: "red",
  },
  top_view: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 25,
    // marginBottom: 15,
  },
  complete_text_title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
  },
  go_back_btn: {
    position: "absolute",
    left: 20,
    top: -8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
  },
  car_info: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    // paddingBottom: 10,
    marginTop: 10,
    borderColor: "gray",
    // backgroundColor: "#F2F5F7",
  },
  car_info_left: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    alignItems: "flex-start",
    // borderWidth: 1,
    // borderColor: "yellow",
  },
  image_view: {
    width: "50%",
    height: "100%",
    // borderWidth: 1,
    // borderColor: "lightblue",
  },
  brand: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    paddingLeft: 5,
  },
  model: {
    fontFamily: "MontserratRegular",
    fontSize: 16,
    paddingLeft: 5,
  },
  date_view: {
    marginVertical: 20,
    marginHorizontal: 12,
  },
  date_title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 20,
  },
  open_calendar_btn: {
    borderWidth: 1,
    borderColor: "black",
    width: 200,
    height: 35,
    marginHorizontal: 12,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: -15,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
});
