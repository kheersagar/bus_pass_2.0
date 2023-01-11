import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../Slices/userSlice";
import { applyBussPass, getUserData } from "../API/API";
import CustomModal from "../components/Modal";
import ImageZoom from "react-native-image-pan-zoom";
import FullScreenLoading from "../components/FullScreenLoading";
const { width, height } = Dimensions.get("window");
import { StatusBar as ExpoBar } from "expo-status-bar";

const ApplyBusPass = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const {
    applyLoading,
    receipt_img,
    userData,
    userData: {
      profile_img,
      first_name,
      last_name,
      email,
      branch,
      semester,
      phone_no,
      address,
      status,
    },
  } = useSelector((state) => state.user);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      dispatch(userActions.setRecieptImg(result.assets));
    }
  };

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
      }}
    >
      <ExpoBar style="dark" translucent={true} hidden={false} />

      {modalVisible && (
        <CustomModal
          modalVisible={modalVisible}
          top={height / 1.5}
          handleClose={() => setModalVisible(false)}
        >
          <View
            className="flex-1  w-full h-80 rounded-xl "
            style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
          >
            <View className="w-full items-center justify-center">
              <View className="w-14 h-2 bg-white rounded-full items-center justify-center mt-2"></View>
            </View>
            <View className="w-full items-end z-10">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className=" mt-2 mr-2 w-24 h-12 rounded-full justify-center items-center px-4 bg-white"
              >
                <Text className="text-black text-xl font-semibold">Close</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1 justify-center items-center">
              <ImageZoom
                cropWidth={Dimensions.get("window").width}
                cropHeight={Dimensions.get("window").height}
                imageWidth={Dimensions.get("window").width}
                imageHeight={200}
                panToMove={true}
                pinchToZoom={true}
              >
                {receipt_img && (
                  <Image
                    source={{ uri: receipt_img[0].uri }}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </ImageZoom>
            </View>
          </View>
        </CustomModal>
      )}
      {/* loading screen */}
      <FullScreenLoading isLoading={applyLoading} />
      <View className="flex-1 bg-[#FFD652]">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            resizeMode="contain"
            source={{
              uri: profile_img,
            }}
            className="w-full h-52 object-cover rounded-lg"
          />
          <View className="  flex-1 p-4 px-6">
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {first_name + " " + last_name}
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {branch}
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {semester} semester
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {phone_no}
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {address}
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {email}
            </Text>
            {/* Upload image */}
            <TouchableOpacity
              className="flex-row  items-center w-full rounded-full p-2 px-4 mt-4"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              onPress={pickImage}
            >
              <Image
                source={require("../assets/Image/Icons/edit_img.png")}
                className="flex-none"
              />
              <Text className="text-white font-extrabold text-xl flex-1 w-86 text-center">
                Upload bus receipt
              </Text>
            </TouchableOpacity>
            {/* receipt */}
            {receipt_img && (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  source={{
                    uri: receipt_img[0].uri,
                  }}
                  className="w-full h-40 mt-2 rounded-md object-contain"
                />
              </TouchableOpacity>
            )}
            {/* button */}
            <View className="justify-center items-center">
              <TouchableOpacity
                disabled={status === 1 || status === 2}
                className="flex-row  items-center w-full h-14 rounded-full p-2 px-4 mt-4 bg-[#102243]"
                onPress={() => dispatch(applyBussPass(userData, receipt_img))}
              >
                <Text
                  className={`text-white font-extrabold text-xl flex-1 w-86 text-center`}
                >
                  {status === 1
                    ? "Applied"
                    : status === 2
                    ? "Approved"
                    : "Apply"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ApplyBusPass;
