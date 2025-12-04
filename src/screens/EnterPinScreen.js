import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import colors from "../theme/colors";
import * as SecureStore from "expo-secure-store";

export default function EnterPinScreen({ navigation, route }) {
  const [pin, setPin] = useState("");

  const handleCheckPin = async () => {
    if (pin.length !== 4) return;

    const savedPin = await SecureStore.getItemAsync("user_pin");

    if (!savedPin) {
      alert("No PIN found. Please create a PIN first.");
      return;
    }

    if (pin === savedPin) {
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } else {
      alert("Wrong PIN");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter PIN</Text>
      <Text style={styles.subtitle}>Unlock your account</Text>

      <TextInput
        style={styles.pinInput}
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry
        value={pin}
        onChangeText={setPin}
      />

      <TouchableOpacity
        style={[styles.button, pin.length === 4 && { opacity: 1 }]}
        disabled={pin.length !== 4}
        onPress={handleCheckPin}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 30 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 10 },
  subtitle: { color: "#666", marginBottom: 40 },
  pinInput: {
    fontSize: 30,
    letterSpacing: 20,
    textAlign: "center",
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 12,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 12,
    marginTop: 40,
    opacity: 0.5,
  },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 18 },
});
