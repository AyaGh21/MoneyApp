import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

import EnterPinScreen from "../screens/EnterPinScreen";
import CreatePinScreen from "../screens/CreatePinScreen";

import BottomTabs from "./MainTabs"; // 👈 your tab navigator

import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import OTPScreen from "../screens/OTPScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangePinScreen from "../screens/ChangePinScreen";

import TransferSuccessScreen from "../screens/TransferSuccessScreen";
import ManageQuickSendScreen from "../screens/ManageQuickSendScreen";
import QRScanScreen from "../screens/QRScanScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* AUTH FLOW */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="EnterPin" component={EnterPinScreen} />
          <Stack.Screen name="CreatePin" component={CreatePinScreen} />

          {/* MAIN APP = BOTTOM TABS */}
          <Stack.Screen name="MainTabs" component={BottomTabs} />

          {/* EXTRA SCREENS */}
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen name="ChangePin" component={ChangePinScreen} />

          <Stack.Screen
            name="TransferSuccess"
            component={TransferSuccessScreen}
          />
          <Stack.Screen
            name="ManageQuickSend"
            component={ManageQuickSendScreen}
          />
          <Stack.Screen name="QRScan" component={QRScanScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
