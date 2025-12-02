import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation rules
  const hasLength = password.length >= 6;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const handleSignup = () => {
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    navigation.navigate("CreatePin");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 310 }}>
        {/* ---------- TOP WAVE BACKGROUND ---------- */}
        <View style={styles.waveContainer}>
          <Svg height="100%" width="100%" viewBox="0 0 1440 320">
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

        {/* ---------- SIGNUP CARD ---------- */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.cardWrapper}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Create Account</Text>

            {/* FULL NAME */}
            <Input
              icon="user"
              placeholder="Username"
              value={fullName}
              onChangeText={setFullName}
            />

            {/* EMAIL */}
            <Input
              icon="mail"
              placeholder="Email"
              keyboard="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {/* PHONE */}
            <Input
              icon="phone"
              placeholder="Phone Number"
              keyboard="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            {/* PASSWORD */}
            <View style={styles.inputWrapper}>
              <Feather name="lock" size={18} color="#888" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Password rules */}
            <View style={styles.rules}>
              <Rule label="At least 6 characters" valid={hasLength} />
              <Rule label="At least one uppercase letter" valid={hasUpper} />
              <Rule label="At least one number" valid={hasNumber} />
            </View>

            {/* CONFIRM PASSWORD */}
            <View style={styles.inputWrapper}>
              <Feather name="lock" size={18} color="#888" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            {/* SIGN UP BUTTON */}
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

/* -------------------- RULE COMPONENT -------------------- */
function Rule({ label, valid }) {
  return (
    <View style={styles.ruleRow}>
      <Feather
        name={valid ? "check-circle" : "x-circle"}
        size={16}
        color={valid ? "#22c55e" : "#ccc"}
      />
      <Text style={styles.ruleText}>{label}</Text>
    </View>
  );
}

/* -------------------- INPUT COMPONENT -------------------- */
function Input({ icon, placeholder, keyboard, value, onChangeText }) {
  return (
    <View style={styles.inputWrapper}>
      <Feather name={icon} size={18} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboard}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

/* --------------------- STYLES --------------------- */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  waveContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 260,
    pointerEvents: "none", // <–– this is the FIX
    zIndex: -1, // <–– ensures it stays behind
  },

  cardWrapper: {
    marginTop: -130,
    paddingHorizontal: 20,
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
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
  rules: {
    marginBottom: 16,
  },
  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  ruleText: {
    marginLeft: 8,
    color: "#444",
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
});
