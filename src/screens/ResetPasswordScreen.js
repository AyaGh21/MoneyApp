import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import colors from "../theme/colors";
import { Feather } from "@expo/vector-icons";

export default function ResetPasswordScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // --- VALIDATION ---
  const hasLength = password.length >= 6;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const handleReset = () => {
    if (!hasLength || !hasUpper || !hasNumber) {
      Alert.alert("Weak Password", "Please meet all password requirements.");
      return;
    }

    if (password !== confirm) {
      Alert.alert("Mismatch", "Passwords do not match.");
      return;
    }

    Alert.alert("Success", "Your password has been reset!", [
      { text: "OK", onPress: () => navigation.navigate("Login") },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>

        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Enter new password"
          placeholderTextColor="#999"
        />

        <View style={styles.rules}>
          <Rule label="At least 6 characters" valid={hasLength} />
          <Rule label="At least one uppercase letter" valid={hasUpper} />
          <Rule label="At least one number" valid={hasNumber} />
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
          placeholder="Confirm password"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const Rule = ({ label, valid }) => (
  <View style={styles.ruleRow}>
    <Feather
      name={valid ? "check-circle" : "x-circle"}
      size={16}
      color={valid ? "#22c55e" : "#ef4444"}
    />
    <Text style={styles.ruleText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 22,
    color: colors.text,
  },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 14,
  },
  rules: { marginBottom: 16 },
  ruleRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  ruleText: { marginLeft: 8, color: "#444" },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "700" },
});
