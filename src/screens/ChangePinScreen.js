import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import colors from "../theme/colors";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

export default function ChangePinScreen({ navigation }) {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleChangePin = () => {
    if (oldPin.length !== 4) {
      Alert.alert("Invalid Old PIN", "Old PIN must be 4 digits.");
      return;
    }
    if (newPin.length !== 4) {
      Alert.alert("Invalid PIN", "New PIN must be 4 digits.");
      return;
    }
    if (newPin !== confirmPin) {
      Alert.alert("Mismatch", "New PIN and confirmation do not match.");
      return;
    }

    // later you will verify oldPin via backend
    Alert.alert("Success", "Your PIN has been updated!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Change PIN</Text>
        <Text style={styles.subtitle}>Update your 4-digit security PIN</Text>

        {/* OLD PIN */}
        <Text style={styles.label}>Old PIN</Text>
        <TextInput
          style={styles.pinInput}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
          value={oldPin}
          onChangeText={setOldPin}
        />

        {/* NEW PIN */}
        <Text style={styles.label}>New PIN</Text>
        <TextInput
          style={styles.pinInput}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
          value={newPin}
          onChangeText={setNewPin}
        />

        {/* CONFIRM NEW PIN */}
        <Text style={styles.label}>Confirm New PIN</Text>
        <TextInput
          style={styles.pinInput}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
          value={confirmPin}
          onChangeText={setConfirmPin}
        />

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleChangePin}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 6,
    marginLeft: 4,
  },
  pinInput: {
    width: "50%",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 28,
    letterSpacing: 18,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    marginBottom: 25,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
  },
});
