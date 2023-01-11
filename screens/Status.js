import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../API/API";
import { useNavigation } from "@react-navigation/native";
import { StatusBar as ExpoBar } from "expo-status-bar";
import FullScreenLoading from "../components/FullScreenLoading";

const Status = () => {
  const navigate = useNavigation();
  const { notifications, notificationLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  function formatDate(d) {
    const date = new Date(d);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return (d = dd + "/" + mm + "/" + yyyy);
  }

  useEffect(() => {
    dispatch(getNotification());
  }, [dispatch]);

  const Listitem = ({ item }) => {
    const { status, updatedAt } = item;
    const statusText =
      status === 1 ? "Applied" : status === 2 ? "Approved" : "Decliend";
    return (
      <TouchableOpacity
        onPress={() => navigate.navigate("pass-status", { data: item })}
      >
        <View className="border-b py-2 rounded-xl">
          <Text
            className={`text-3xl font-bold w-full mb-2 ${
              status === 2
                ? "text-[#2C9D10]"
                : status === 3
                ? "text-red-600"
                : null
            }`}
          >
            {" "}
            {statusText}
          </Text>
          <Text className="font-semibold items-end text-left pl-2 mb-2">
            {formatDate(updatedAt)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
      }}
    >
      <ExpoBar style="dark" translucent={true} hidden={false} />
      {notificationLoading ? (
        <FullScreenLoading isLoading={true} />
      ) : (
        <>
          <View className="relative h-56">
            <Image
              source={require("../assets/Image/statusBackground.png")}
              className="w-full h-56 absolute"
            />
            <Text className="absolutes top-20 left-10 font-medium text-6xl">
              Status
            </Text>
          </View>
          {notifications.length > 0 ? (
            <View className="bg-[#D9DEF5] flex-1  m-4 px-4 pt-10">
              <FlatList
                data={notifications}
                keyExtractor={(item) => item._id}
                renderItem={Listitem}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <View className="flex-1 justify-center items-center">
              <Image source={require("../assets/Image/statusbg.png")} />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default Status;
