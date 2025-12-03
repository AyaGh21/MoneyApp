import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../theme/colors";

export default function CreatePinScreen({ navigation }) {
  const [pin, setPin] = useState("");

  const handleSubmit = () => {
    if (pin.length !== 4) return;
    navigation.replace("MainTabs");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create PIN</Text>
      <Text style={styles.subtitle}>Set a 4-digit security PIN</Text>

      <TextInput
        style={styles.pinInput}
        keyboardType="numeric"
        maxLength={4}
        value={pin}
        onChangeText={setPin}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, pin.length === 4 && { opacity: 1 }]}
        disabled={pin.length !== 4}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Save PIN</Text>
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
