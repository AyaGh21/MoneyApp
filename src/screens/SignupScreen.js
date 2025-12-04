import React, { useState, useEffect, useRef } from "react";
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
  Animated,
} from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import colors from "../theme/colors";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const wave3 = useRef(new Animated.Value(0)).current;
  const wave4 = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(50)).current;
  const cardFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(wave1, {
          toValue: 1,
          duration: 7000,
          useNativeDriver: true,
        }),
        Animated.timing(wave1, {
          toValue: 0,
          duration: 7000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(wave2, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(wave2, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(wave3, {
          toValue: 1,
          duration: 9000,
          useNativeDriver: true,
        }),
        Animated.timing(wave3, {
          toValue: 0,
          duration: 9000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(wave4, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(wave4, {
          toValue: 0,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.parallel([
      Animated.timing(cardFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(cardSlide, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const hasLength = password.length >= 6;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const wave1TranslateX = wave1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });

  const wave1TranslateY = wave1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 8],
  });

  const wave2TranslateX = wave2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 70],
  });

  const wave2TranslateY = wave2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const wave3TranslateX = wave3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });

  const wave3TranslateY = wave3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 6],
  });

  const wave4TranslateX = wave4.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  const wave4TranslateY = wave4.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  const handleSignup = async () => {
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.1.119/money-api/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: fullName,
            email,
            phone,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Account created!");
        navigation.navigate("CreatePin", { user_id: data.user_id });
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      alert("Network error");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.waveContainer}>
        <Svg
          height="100%"
          width="100%"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <Defs>
            <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={colors.primary} stopOpacity="0.2" />
              <Stop offset="50%" stopColor={colors.primary} stopOpacity="0.3" />
              <Stop
                offset="100%"
                stopColor={colors.primary}
                stopOpacity="0.2"
              />
            </LinearGradient>
            <LinearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={colors.primary} stopOpacity="0.35" />
              <Stop offset="50%" stopColor={colors.primary} stopOpacity="0.5" />
              <Stop
                offset="100%"
                stopColor={colors.primary}
                stopOpacity="0.35"
              />
            </LinearGradient>
            <LinearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={colors.primary} stopOpacity="0.6" />
              <Stop
                offset="50%"
                stopColor={colors.primary}
                stopOpacity="0.75"
              />
              <Stop
                offset="100%"
                stopColor={colors.primary}
                stopOpacity="0.6"
              />
            </LinearGradient>
            <LinearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={colors.primary} stopOpacity="0.85" />
              <Stop offset="50%" stopColor={colors.primary} stopOpacity="1" />
              <Stop
                offset="100%"
                stopColor={colors.primary}
                stopOpacity="0.85"
              />
            </LinearGradient>
          </Defs>

          <AnimatedPath
            fill="url(#grad1)"
            d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            style={{
              transform: [
                { translateX: wave1TranslateX },
                { translateY: wave1TranslateY },
              ],
            }}
          />

          <AnimatedPath
            fill="url(#grad2)"
            d="M0,96L48,106.7C96,117,192,139,288,144C384,149,480,139,576,128C672,117,768,107,864,112C960,117,1056,139,1152,144C1248,149,1344,139,1392,133.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            style={{
              transform: [
                { translateX: wave2TranslateX },
                { translateY: wave2TranslateY },
              ],
            }}
          />

          <AnimatedPath
            fill="url(#grad3)"
            d="M0,64L48,80C96,96,192,128,288,133.3C384,139,480,117,576,106.7C672,96,768,96,864,106.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            style={{
              transform: [
                { translateX: wave3TranslateX },
                { translateY: wave3TranslateY },
              ],
            }}
          />

          <AnimatedPath
            fill="url(#grad4)"
            d="M0,32L48,42.7C96,53,192,75,288,85.3C384,96,480,96,576,90.7C672,85,768,75,864,80C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            style={{
              transform: [
                { translateX: wave4TranslateX },
                { translateY: wave4TranslateY },
              ],
            }}
          />
        </Svg>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 310 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.cardWrapper}
        >
          <Animated.View
            style={[
              styles.card,
              {
                opacity: cardFade,
                transform: [{ translateY: cardSlide }],
              },
            ]}
          >
            <Text style={styles.title}>Create Account</Text>

            <Input
              icon="user"
              placeholder="Username"
              value={fullName}
              onChangeText={setFullName}
            />

            <Input
              icon="mail"
              placeholder="Email"
              keyboard="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Input
              icon="phone"
              placeholder="Phone Number"
              keyboard="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

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

            <View style={styles.rules}>
              <Rule label="At least 6 characters" valid={hasLength} />
              <Rule label="At least one uppercase letter" valid={hasUpper} />
              <Rule label="At least one number" valid={hasNumber} />
            </View>

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
          </Animated.View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    height: 350,
    pointerEvents: "none",
    zIndex: 0,
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
