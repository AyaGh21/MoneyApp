import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../theme/colors";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topCurve} />

      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Sign in or create an account</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.outlineButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.outlineButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  topCurve: {
    backgroundColor: colors.primary,
    width: "100%",
    height: 720,
    borderBottomLeftRadius: 140,
    borderBottomRightRadius: 140,
    bottom: 80,
  },

  title: {
    fontSize: 32,
    color: colors.text,
    fontWeight: "bold",
    marginTop: -180,
  },

  subtitle: {
    color: colors.text,
    opacity: 0.6,
    marginBottom: 30,
  },

  button: {
    backgroundColor: colors.primary,
    width: "80%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },

  outlineButton: {
    width: "80%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.primary,
    marginTop: 15,
  },

  outlineButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
});
