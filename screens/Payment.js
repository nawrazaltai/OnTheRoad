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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import CalendarPicker from "react-native-calendar-picker";

export default function Payment({ navigation, route }) {
  const { item } = route?.params;
  const { allBrands } = useContext(UsersContext);
  const [brandLogo, setBrandLogo] = useState("");

  const today = new Date().toISOString().slice(0, 10);
  const [selected, setSelected] = useState([]);
  //   const [date, setDate] = useState(new Date());

  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [test, setTest] = useState(1);

  useEffect(() => {
    findBrand();
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
    // console.log(getPreviousDay(new Date("2023-07-10")));

    // getCars();
  }, []);

  if (!loaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  //   let mark = {};

  //   selected.forEach((day) => {
  //     mark[day] = {
  //       selected: true,

  //     };
  //   });
  function onDateChange(date, type) {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  }

  const fetchedDisabledDates = [
    "2023-07-10",
    "2023-07-11",
    "2023-07-12",
    "2023-07-13",
    "2023-07-14",
    "2023-07-15",
    "2023-07-19",
    "2023-08-24",
  ];

  function getPreviousDay(selected) {
    // for (let i = 0; i < fetchedDisabledDates.length; i++) {
    //   let date = new Date(fetchedDisabledDates[i]);

    //   const previous = new Date(date.getTime());
    //   previous.setDate(date.getDate() - 1);
    //   console.log(previous);

    //   if (
    //     selected?.toISOString().slice(0, 10) ==
    //     previous?.toISOString().slice(0, 10)
    //   )
    //     return previous;
    // }

    // console.log("selected", selected);

    let nearestArr = [];
    for (let i = 0; i < fetchedDisabledDates.length; i++) {
      let date = new Date(fetchedDisabledDates[i]);
      if (date > selected) {
        nearestArr.push(date);
        break;
      }
      // return previous;
      //   return setTest(diff);
    }
    let diff = Math.round((nearestArr[0] - selected) / (1000 * 60 * 60 * 24));
    console.log("diff", typeof diff);
    return diff;
    // setTest(diff);
    // console.log(
    //   nearestArr[0].toISOString().split(0, 10) -
    //     selected.toISOString().split(0, 10)
    // );
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

      <View style={styles.date_view}>
        <Text style={styles.date_title}>Select dates</Text>
      </View>

      <CalendarPicker
        minDate={new Date(today)}
        allowRangeSelection={true}
        selectedDayColor="#32928c"
        onDateChange={onDateChange}
        maxRangeDuration={[
          {
            // date: getPreviousDay(new Date(selectedStartDate)),
            date: new Date(selectedStartDate),
            // maxDuration: getPreviousDay(new Date(selectedStartDate)),
            maxDuration: getPreviousDay(new Date(selectedStartDate)),
          },
        ]}
        disabledDates={fetchedDisabledDates}

        // disabledDates={(date) => {
        //   var startDate = selectedStartDate;
        //   var endDate = selectedEndDate;
        //   if (fetchedDisabledDates.includes(date)) {
        //     return;
        //   } else {
        //     return date.isBetween(startDate, endDate);
        //   }
        // }}
        // disabledDates={fetchedDisabledDates}
      />
      {/* {console.log(selectedStartDate, selectedEndDate)} */}
      {/* {console.log(("here", new Date()))} */}

      {/* {console.log(new Date(fetchedDisabledDates[0]).setDate(fetc))} */}

      {/* <Calendar
        style={{
          marginTop: 40,
        }}
        onDayPress={(day) => {
          if (startDay && !endDay) {
            const date = {};
            for (
              const d = moment(startDay);
              d.isSameOrBefore(day.dateString);
              d.add(1, "days")
            ) {
              date[d.format("YYYY-MM-DD")] = {
                marked: true,
                color: "#32928c",
                textColor: "white",
              };

              if (d.format("YYYY-MM-DD") === startDay)
                date[d.format("YYYY-MM-DD")].startingDay = true;
              if (d.format("YYYY-MM-DD") === day.dateString)
                date[d.format("YYYY-MM-DD")].endingDay = true;
            }

            setMarkedDates(date);
            setEndDay(day.dateString);
          } else {
            setStartDay(day.dateString);
            setEndDay(null);
            setMarkedDates({
              [day.dateString]: {
                marked: true,
                // color: "black",
                color: "#32928c",
                textColor: "white",
                startingDay: true,
                endingDay: true,
              },
            });
          }
        }}
        minDate={today}
        monthFormat={"MMMM yyyy"}
        disableAllTouchEventsForDisabledDays
        hideDayNames={false}
        disabledDates={"2023-07-05"}
        markingType={"period"}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: "#32928c",
          selectedDayTextColor: "white",
          monthTextColor: "black",
          dayTextColor: "black",
          textMonthFontSize: 18,
          textDayHeaderFontSize: 16,
          arrowColor: "#32928c",
          dotColor: "#32928c",
        }}
      /> */}

      {/* {console.log(Object.keys(markedDates).length)}
      {console.log(Object.keys(markedDates))} */}
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
});
