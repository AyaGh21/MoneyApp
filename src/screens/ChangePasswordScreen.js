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

export default function ChangePasswordScreen({ navigation }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleChange = () => {
    if (!oldPass || !newPass || !confirmPass) {
      Alert.alert("Missing Fields", "Please fill all fields.");
      return;
    }

    if (newPass.length < 6) {
      Alert.alert(
        "Weak Password",
        "New password must be at least 6 characters."
      );
      return;
    }

    if (newPass !== confirmPass) {
      Alert.alert("Mismatch", "New password and confirmation do not match.");
      return;
    }

    // Fake success — backend later
    Alert.alert("Success", "Your password has been updated!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Change Password</Text>

        {/* OLD PASSWORD */}
        <Text style={styles.label}>Old Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Enter old password"
          placeholderTextColor="#999"
          value={oldPass}
          onChangeText={setOldPass}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />

        {/* NEW PASSWORD */}
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Enter new password"
          placeholderTextColor="#999"
          value={newPass}
          onChangeText={setNewPass}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />

        {/* CONFIRM PASSWORD */}
        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Confirm new password"
          placeholderTextColor="#999"
          value={confirmPass}
          onChangeText={setConfirmPass}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleChange}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: colors.text,
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 18,
    fontSize: 15,
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
