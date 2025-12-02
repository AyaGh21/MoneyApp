import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../theme/colors";

export default function OTPScreen({ route, navigation }) {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length < 4) {
      Alert.alert("Invalid Code", "Enter the full verification code.");
      return;
    }

    navigation.navigate("ResetPassword", { email: route.params.email });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          We've sent a code to {route.params.email}
        </Text>

        <TextInput
          style={styles.otpInput}
          keyboardType="numeric"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
          placeholder="••••"
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    color: colors.text,
  },
  subtitle: { color: "#666", textAlign: "center", marginBottom: 25 },
  otpInput: {
    backgroundColor: "#fff",
    fontSize: 28,
    letterSpacing: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "600" },
});
