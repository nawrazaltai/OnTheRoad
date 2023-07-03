import React, { useContext, useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { UsersContext } from "../UsersContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function CustomDrawer(props) {
  const { firstName, lastName, email, logout } = useContext(UsersContext);

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

  function capitalFirstLetter(name) {
    return name?.charAt(0).toUpperCase() + name?.slice(1);
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 0 }}>
      <View
        style={{
          height: "20%",
          //   marginHorizontal: 15,
          borderBottomWidth: 1,
          borderBottomColor: "#32928c",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#32928c",
        }}
      >
        <FontAwesome
          name="user-circle"
          size={60}
          color={"white"}
          style={{ position: "absolute", left: 10, top: 20 }}
        />
        <Text
          style={{
            position: "absolute",
            left: 10,
            top: 80,
            fontSize: 25,
            fontFamily: "MontserratSemiBold",
            color: "#fff",
          }}
        >
          {capitalFirstLetter(firstName) + " " + capitalFirstLetter(lastName)}
        </Text>
        <Text
          style={{
            position: "absolute",
            left: 10,
            top: 108,
            fontSize: 16,
            fontFamily: "MontserratRegular",
            color: "#fff",
          }}
        >
          {email}
        </Text>
        {/* <ImageBackground
          style={{ flex: 1, opacity: 0.1, width: 200, height: 200 }}
          source={require("../assets/4.png")}
        /> */}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          borderTopColor: "lightgray",
          borderTopWidth: 1,
          //   marginHorizontal: 10,
          width: "100%",
          paddingVertical: 15,
          paddingHorizontal: 8,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => logout()}
        >
          <MaterialIcons name="logout" size={24} />
          <Text style={{ fontFamily: "MontserratRegular", fontSize: 16 }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <DrawerContentScrollView {...props}>
        {/* <DrawerItem
          {...props}
          label="Home"
          focused={  true}
          inactiveBackgroundColor="red"
          activeBackgroundColor="green"
          activeTintColor="white"
          onPress={() => props.navigation.navigate("Home")}
        />
        <DrawerItem
          {...props}
          inactiveBackgroundColor="red"
          activeBackgroundColor="green"
          label="HistoryBookings"
          onPress={() => props.navigation.navigate("HistoryBookings")}
        /> */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}
