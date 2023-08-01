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
import StepIndicator from "react-native-step-indicator";
import Payment from "../components/Payment";
import Swiper from "react-native-swiper";
import Calendar from "../components/Calendar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StripeProvider } from "@stripe/stripe-react-native";
// import { date } from "yup";

const STRIPE_PUBLISH_KEY =
  "pk_test_51NXi92K0mqoNcqHyu3eQUYhp3nvukXdbxYhztnK5x1mgrZKVhXRgrBPXvyRu1iOSmzkChUuxsXYba65pymGeMeNt00pMVc02rY";

export default function CompleteRent({ navigation, route }) {
  const { item } = route?.params;
  const [currentPage, setCurrentPage] = useState(1);
  const { allBrands, car_booking, userId, paymentValid, setPaymentValid } =
    useContext(UsersContext);
  const [brandLogo, setBrandLogo] = useState("");
  const [datesConfirmed, setDatesConfirmed] = useState(false);
  const today = new Date(Date.now()).toISOString().slice(0, 10);

  const labels = ["Select car", "Select dates", "Details & Payment"];
  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: "feed",
      color: stepStatus === "finished" ? "#ffffff" : "#fe7013",
      size: 20,
    };
    switch (position) {
      case 0: {
        iconConfig.name = "check";
        break;
      }
      case 1: {
        if (datesConfirmed && currentPage !== position) {
          //   stepStatus = "finished";
          iconConfig.name = "check";
        } else {
          iconConfig.name = "date-range";
        }
        break;
      }
      case 2: {
        iconConfig.name = "payment";
        break;
      }
      default: {
        break;
      }
    }
    return iconConfig;
  };

  const onStepPress = (position) => {
    // console.log(stepStatus);
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

  const moveToNextStepManually = () => {
    if (paymentValid && currentPage == 1) {
      setCurrentPage((currentPage) => currentPage + 2);
    }
    setCurrentPage((currentPage) => currentPage + 1);
  };

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

  const [selectedStartDate, setSelectedStartDate] = useState(today);
  const [selectedEndDate, setSelectedEndDate] = useState(today);
  const [totalDays, setTotalDays] = useState(0);
  const [disabledConfirmBtn, setDisabledConfirmBtn] = useState(true);
  const [confirmError, setConfirmError] = useState("");
  // const [modalVisible, setModalVisible] = useState(false);
  // const [datesConfirmed, setDatesConfirmed] = useState(false);
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

  // useEffect(() => {
  //   if (datesConfirmed) {
  //     setCurrentPage((currentPage) => currentPage + 1);
  //   } else {
  //     setCurrentPage((currentPage) => 1);
  //   }
  // }, [datesConfirmed]);

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

  // function onDateChange(date, type) {
  //   if (type === "END_DATE") {
  //     setSelectedEndDate(date);
  //   } else {
  //     setSelectedStartDate(date);
  //     setSelectedEndDate(null);
  //   }
  // }

  // function getPreviousDay(selected) {
  //   let nearestArr = [];
  //   for (let i = 0; i < fetchedDisabledDates.length; i++) {
  //     let date = new Date(fetchedDisabledDates[i]);
  //     if (date > selected) {
  //       nearestArr.push(date);
  //       break;
  //     }
  //   }
  //   let diff = Math.round((nearestArr[0] - selected) / (1000 * 60 * 60 * 24));
  //   return diff;
  // }

  // const onConfirm = () => {
  //   if (disabledConfirmBtn) {
  //     setConfirmError("Please select an end date");
  //   } else {
  //     // console.log(totalDays);
  //     getDates(selectedStartDate, selectedEndDate);
  //     setDatesConfirmed(true);
  //     setModalVisible(false);
  //   }
  // };

  // GET ALL DATES BETWEEN START AND END DATE
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

  const customStyles = {
    stepIndicatorSize: 35,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#fe7013",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#fe7013",
    stepStrokeFinishedColor: "#32928c",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#fe7013",
    separatorFinishedColor: "#32928c",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorFinishedColor: "#32928c",
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

  const PAGES = [
    "",
    <Calendar
      fetchedDisabledDates={fetchedDisabledDates}
      today={today}
      selectedStartDate={selectedStartDate}
      setSelectedStartDate={setSelectedStartDate}
      selectedEndDate={selectedEndDate}
      setSelectedEndDate={setSelectedEndDate}
      totalDays={totalDays}
      setTotalDays={setTotalDays}
      datesConfirmed={datesConfirmed}
      setDatesConfirmed={setDatesConfirmed}
      setSelectedDays={setSelectedDays}
      selectedDays={selectedDays}
      getDates={getDates}
      disabledConfirmBtn={disabledConfirmBtn}
      setDisabledConfirmBtn={setDisabledConfirmBtn}
      moveToNextStepManually={moveToNextStepManually}
      paymentValid={paymentValid}
    />,
    <StripeProvider publishableKey={STRIPE_PUBLISH_KEY}>
      <Payment
        moveToNextStepManually={moveToNextStepManually}
        item={item}
        brandLogo={brandLogo}
        datesConfirmed={datesConfirmed}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        selectedDays={selectedDays}
        totalDays={totalDays}
      />
      ,
    </StripeProvider>,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_view}>
        <TouchableOpacity
          style={styles.go_back_btn}
          onPress={() => navigation.goBack()}
        >
          <IonIcons name="chevron-back" color="gray" size={15} />
        </TouchableOpacity>
        <Text style={styles.complete_text_title}>Checkout</Text>
      </View>
      <View
        style={{
          marginTop: 5,
          marginBottom: 12,
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
          marginHorizontal: 10,
          paddingBottom: 5,
        }}
      >
        <StepIndicator
          labels={labels}
          currentPosition={currentPage}
          customStyles={customStyles}
          stepCount={labels.length}
          renderStepIndicator={renderStepIndicator}
          onPress={onStepPress}
        />
      </View>
      {/* {!datesConfirmed && (
        <>
        <Calendar
              fetchedDisabledDates={fetchedDisabledDates}
              today={today}
              selectedStartDate={selectedStartDate}
              setSelectedStartDate={setSelectedStartDate}
              selectedEndDate={selectedEndDate}
              setSelectedEndDate={setSelectedEndDate}
              totalDays={totalDays}
              setTotalDays={setTotalDays}
              datesConfirmed={datesConfirmed}
              setDatesConfirmed={setDatesConfirmed}
              setSelectedDays={setSelectedDays}
              selectedDays={selectedDays}
              onConfirm={onConfirm}
              disabledConfirmBtn={disabledConfirmBtn}
              setDisabledConfirmBtn={setDisabledConfirmBtn}
              onCancelDates={onCancelDates}
            />
          </> )} */}

      {/* <View style={styles.date_view}>
            <Text style={styles.date_title}>Select dates</Text>
          </View> */}

      {/* <TouchableOpacity
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
          </TouchableOpacity> */}

      {/* {modalVisible && (
            <Calendar
              fetchedDisabledDates={fetchedDisabledDates}
              today={today}
              selectedStartDate={selectedStartDate}
              setSelectedStartDate={setSelectedStartDate}
              selectedEndDate={selectedEndDate}
              setSelectedEndDate={setSelectedEndDate}
              totalDays={totalDays}
              setTotalDays={setTotalDays}
              datesConfirmed={datesConfirmed}
              setDatesConfirmed={setDatesConfirmed}
              setSelectedDays={setSelectedDays}
              selectedDays={selectedDays}
              onConfirm={onConfirm}
              disabledConfirmBtn={disabledConfirmBtn}
              setDisabledConfirmBtn={setDisabledConfirmBtn}
              onCancelDates={onCancelDates}
            /> */}

      {/* // <View
            //   style={{
            //     borderWidth: 1,
            //     width: "95%",
            //     marginLeft: 12,
            //     borderRadius: 5,
            //     marginTop: 4,
            //     backgroundColor: "#fff",
            //     padding: 10,
            //     zIndex: 10,
            //   }}
            // >
            //    <CalendarPicker
            //     minDate={today}
            //     width={380}
            //     height={400}
            //     initialDate={today}
            //     allowRangeSelection={true}
            //     previousTitle="<<"
            //     nextTitle=">>"
            //     selectedDayColor="#32928c"
            //     onDateChange={onDateChange}
            //     maxRangeDuration={[
            //       {
            //         date: new Date(selectedStartDate),
            //         maxDuration: getPreviousDay(new Date(selectedStartDate)),
            //       },
            //     ]}
            //     disabledDates={fetchedDisabledDates}
            //   />

            //   <View
            //     style={{
            //       flexDirection: "row",
            //       marginTop: 10,
            //       justifyContent: "center",
            //       width: "100%",
            //       gap: 15,
            //       borderTopWidth: 2,
            //       borderTopColor: "lightgray",
            //       paddingTop: 10,
            //     }}
            //   >
            //     <TouchableOpacity
            //       style={
            //         disabledConfirmBtn
            //           ? styles.disabled_confirm_btn
            //           : styles.confirm_btn
            //       }
            //       onPress={() => onConfirm()}
            //       // disabled={disabledConfirmBtn}
            //     >
            //       <Text
            //         style={
            //           disabledConfirmBtn
            //             ? styles.disabled_confirm_btn
            //             : styles.confirm_btn
            //         }
            //       >
            //         Confirm
            //       </Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity
            //       style={styles.cancel_btn}
            //       onPress={() => {
            //         setModalVisible(!modalVisible);
            //         setSelectedStartDate(today);
            //         setSelectedEndDate(today);
            //       }}
            //     >
            //       <Text style={styles.cancel_btn}>Cancel</Text>
            //     </TouchableOpacity>
            //   </View>
            // </View>
          // )}
        {/* </> 
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
          {/* // INSERT BOOKING TO DB *
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
          */}
      {/* {datesConfirmed && <Payment />} */}
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
