import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import colors from "../theme/colors";

export default function EnterPinScreen({ navigation, route }) {
  const [pin, setPin] = useState("");
  const handleCheckPin = async () => {
    if (pin.length !== 4) return;

    try {
      const response = await fetch(
        "http://192.168.1.119/money-api/check_pin.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: route.params.user_id,
            pin: pin,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        });
      } else {
        alert("Wrong PIN");
      }
    } catch (err) {
      console.log("CHECK PIN ERROR:", err);
      alert("Network error");
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
