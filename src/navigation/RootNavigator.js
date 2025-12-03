import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

import EnterPinScreen from "../screens/EnterPinScreen";
import CreatePinScreen from "../screens/CreatePinScreen";

import ReceiveMoneyScreen from "../screens/ReceiveMoneyScreen";
import SendMoneyScreen from "../screens/SendMoneyScreen";
import SupportScreen from "../screens/SupportScreen";
import ManageQuickSendScreen from "../screens/ManageQuickSendScreen";
import TransferSuccessScreen from "../screens/TransferSuccessScreen";
import ChangePinScreen from "../screens/ChangePinScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import OTPScreen from "../screens/OTPScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import QRScanScreen from "../screens/QRScanScreen";

import MainTabs from "./MainTabs";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* FIRST SCREENS */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />

          {/* PIN FLOW */}
          <Stack.Screen name="EnterPin" component={EnterPinScreen} />
          <Stack.Screen name="CreatePin" component={CreatePinScreen} />

          {/* MAIN TABS */}
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ gestureEnabled: false }}
          />

          {/* OTHER PAGES */}
          <Stack.Screen name="ReceiveMoney" component={ReceiveMoneyScreen} />
          <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
          <Stack.Screen name="Support" component={SupportScreen} />
          <Stack.Screen name="ChangePin" component={ChangePinScreen} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen
            name="ManageQuickSend"
            component={ManageQuickSendScreen}
          />
          <Stack.Screen
            name="TransferSuccess"
            component={TransferSuccessScreen}
          />
          <Stack.Screen name="QRScan" component={QRScanScreen} />

          {/* FORGOT PASSWORD FLOW */}
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
