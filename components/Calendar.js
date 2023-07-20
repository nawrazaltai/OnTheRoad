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
import { LocaleConfig } from "react-native-calendars";
import moment from "moment";
import CalendarPicker from "react-native-calendar-picker";

export default function Calendar(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    fetchedDisabledDates,
    today,
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
    setSelectedDays,
    selectedDays,
    datesConfirmed,
    setDatesConfirmed,
    totalDays,
    setTotalDays,
    getDates,
    disabledConfirmBtn,
    setDisabledConfirmBtn,
  } = props;

  function onDateChange(date, type) {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  }
  const onCancelDates = () => {
    setModalVisible(!modalVisible);
    setSelectedStartDate(today);
    setSelectedEndDate(today);
  };

  const onConfirm = () => {
    if (disabledConfirmBtn) {
      setConfirmError("Please select an end date");
    } else {
      // console.log(totalDays);
      getDates(selectedStartDate, selectedEndDate);
      setDatesConfirmed(true);
      setModalVisible(false);
    }
  };

  function getPreviousDay(selected) {
    let nearestArr = [];
    for (let i = 0; i < fetchedDisabledDates?.length; i++) {
      let date = new Date(fetchedDisabledDates[i]);
      if (date > selected) {
        nearestArr.push(date);
        break;
      }
    }
    let diff = Math.round((nearestArr[0] - selected) / (1000 * 60 * 60 * 24));
    return diff;
  }

  return (
    <View
      style={{
        // borderWidth: 1,
        // width: "95%",
        // marginLeft: 12,
        // borderRadius: 5,
        // marginTop: 4,
        // backgroundColor: "#fff",
        // padding: 10,
        zIndex: 10,
      }}
    >
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
        </>
      ) : (
        <>
          <View style={styles.date_view}>
            <Text style={styles.date_title}>Selected dates</Text>
          </View>
          <View
            style={{
              //   borderWidth: 1,
              marginHorizontal: 8,
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
                setModalVisible(true);
              }}
              style={{
                borderWidth: 1,
                borderColor: "black",
                width: "100%",
                alignItems: "center",
                paddingVertical: 8,
                borderRadius: 4,
                // backgroundColor: "#32928c",
                // backgroundColor: "#FF6666",
              }}
            >
              <Text
                style={{ fontFamily: "MontserratSemiBold", color: "#32928c" }}
              >
                Change selected {totalDays > 1 ? "dates" : "date"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {modalVisible && (
        <View
          style={{
            backgroundColor: "white",
            borderWidth: 1,
            zIndex: 20,
            overflow: "hidden",
            marginVertical: 6,
            marginLeft: 12,
            borderRadius: 8,
            paddingVertical: 12,
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
                onCancelDates();
                // setModalVisible(!modalVisible);
                // setSelectedStartDate(today);
                // setSelectedEndDate(today);
              }}
            >
              <Text style={styles.cancel_btn}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
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
    marginHorizontal: 15,
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
