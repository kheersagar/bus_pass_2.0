import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ApplyBusPass from "./screens/ApplyBusPass";
import BusPass from "./screens/BusPass";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Status from "./screens/Status";
import Test from "./screens/Test";
import React from "react";
import { useSelector } from "react-redux";
import Profile from "./screens/Profile";
import PassStatus from "./screens/PassStatus";
import ForgotPassword from "./screens/ForgotPassword";
import { navigationRef } from "./RootNavigation";

const NavigationProvider = () => {
  const Stack = createNativeStackNavigator();
  const { isAuth } = useSelector((state) => state.user);
  console.log(isAuth)
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login">
        {!isAuth ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="forgot-password"
              component={ForgotPassword}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ApplyBusPass"
              component={ApplyBusPass}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Status"
              component={Status}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="BusPass"
              component={BusPass}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="pass-status"
              component={PassStatus}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="test"
              component={Profile}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationProvider;
