import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";

import React, { useEffect } from "react";
import { usePreventScreenCapture } from "expo-screen-capture";
import { getBusPass } from "../API/API";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar as ExpoBar } from "expo-status-bar";
import FullScreenLoading from "../components/FullScreenLoading";
function Detail({ value, title }) {
  return (
    <View className="flex-row mb-2 pr-2">
      <Text className="flex-none w-32 mr-2 text-lg font-extrabold">
        {title}
      </Text>
      <Text className="text-gray-800 text-lg font-extrabold bg-gray-400 rounded-md px-2">
        {value}{" "}
      </Text>
    </View>
  );
}

const BusPass = () => {
  // usePreventScreenCapture();
  const dispatch = useDispatch();
  const {
    busPassDetails,
    busPassLoading,
    busPassDetails: {
      qr_code,
      valid_till,
      bus_no,
      user_details: {
        username,
        profile_img,
        first_name,
        last_name,
        email,
        branch,
        semester,
        phone_no,
        address,
        status,
        pickup_point,
      } = {}, //if  obj is null or undefined
    } = {}, //if  obj is null or undefined
  } = useSelector((state) => state.user);
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
  var data = [
    {
      id: 10,
      title: "Name",
      value: first_name + " " + last_name,
    },
    {
      id: 1,
      title: "Branch",
      value: branch,
    },
    {
      id: 2,
      title: "Semester",
      value: semester,
    },
    {
      id: 3,
      title: "Enrollment No.",
      value: username,
    },
    {
      id: 7,
      title: "Valid Date",
      value: formatDate(valid_till),
    },
    {
      id: 4,
      title: "Bus No.",
      value: bus_no,
    },
    {
      id: 5,
      title: "Pickup Point",
      value: pickup_point,
    },
    {
      id: 6,
      title: "Address",
      value: address,
    },
  ];
  useEffect(() => {
    dispatch(getBusPass());
  }, [dispatch]);
  console.log("comp", busPassDetails === "No Pass Available!!");
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
      }}
    >
      <ExpoBar style="dark" translucent={true} hidden={false} />
{busPassLoading ? 
<FullScreenLoading isLoading={true}/>
:

      !busPassDetails || busPassDetails == {}|| busPassDetails === "No Pass Available!!" ||
      busPassDetails === "Bus Pass Expired!!" || busPassDetails === 'Internal Server Error' ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-black font-extrabold text-3xl">
            No Pass Available!!
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>

        <ImageBackground
          source={require("../assets/Image/bussPassBackground.png")}
          className="flex-1 w-full h-full"
        >
          <View className="items-center mt-2 pb-2 ">
            <Image
              source={require("../assets/Image/opju_logo.png")}
              className="object-cover"
            />
            <Image
              source={{
                uri: profile_img,
              }}
              className="w-40 h-40 mt-4 rounded-lg"
            />
          </View>
          <View className="mt-4 px-8">
            {data.map((item) => {
              return <Detail {...item} key={item.id} />;
            })}
          </View>
          <View className="mt-2 px-8 items-center">
            <Image source={{ uri: qr_code }} className="w-32 h-32 " />
            <Text className="text-black font-extrabold text-lg">
              Authorities Signatory
            </Text>
          </View>
        </ImageBackground>
        </ScrollView>
      )
}
    </SafeAreaView>
  );
};

export default BusPass;
