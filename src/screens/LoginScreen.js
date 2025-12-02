import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function LoginScreen({ navigation }) {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* ---------- TOP WAVE (FULL SCREEN TOP) ---------- */}
      <View style={styles.waveContainer}>
        <Svg height="420" width="100%" viewBox="0 0 1440 320">
          <Path
            fill={colors.primary}
            d="M0,64L60,85.3C120,107,240,149,360,176C480,203,600,213,720,208C840,203,960,181,1080,149.3C1200,117,1320,75,1380,53.3L1440,32V0H0Z"
          />
          <Path
            fill={colors.primary}
            fillOpacity="0.7"
            d="M0,192L80,176C160,160,320,128,480,117C640,107,800,117,960,149C1120,181,1280,235,1360,256L1440,277V0H0Z"
          />
        </Svg>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.formWrapper}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Welcome Back</Text>

            {/* EMAIL / PHONE */}
            <View style={styles.inputWrapper}>
              <Feather name="mail" size={18} color="#888" />
              <TextInput
                style={styles.input}
                placeholder="Email or Phone"
                placeholderTextColor="#999"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
              />
            </View>

            {/* PASSWORD */}
            <View style={styles.inputWrapper}>
              <Feather name="lock" size={18} color="#888" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* LOGIN BUTTON */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("EnterPin")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("Signup")}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  waveContainer: {
    position: "absolute",
    top: 0,
    height: 320,
    width: "100%",
    zIndex: 1,
  },

  scroll: {
    flexGrow: 1,
    paddingTop: 250,
    paddingHorizontal: 20,
  },

  formWrapper: {
    width: "100%",
  },

  card: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
    marginBottom: 25,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 15,
    height: 50,
    gap: 10,
  },

  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  footerText: {
    textAlign: "center",
    color: "#555",
    marginTop: 18,
  },

  link: {
    color: colors.primary,
    fontWeight: "700",
  },

  forgotText: {
    color: colors.primary,
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
  },
});
