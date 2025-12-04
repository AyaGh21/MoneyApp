import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import colors from "../theme/colors";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function WelcomeScreen({ navigation }) {
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const wave3 = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Wave animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(wave1, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        }),
        Animated.timing(wave1, {
          toValue: 0,
          duration: 8000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(wave2, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(wave2, {
          toValue: 0,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(wave3, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(wave3, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const wave1TranslateX = wave1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  const wave2TranslateX = wave2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  const wave3TranslateX = wave3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.waveContainer}>
        <Svg
          height="300"
          width="100%"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <AnimatedPath
            fill={colors.primary}
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            style={{
              transform: [{ translateX: wave1TranslateX }],
            }}
          />

          <AnimatedPath
            fill={colors.primary}
            fillOpacity="0.5"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,122.7C960,139,1056,149,1152,138.7C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            style={{
              transform: [{ translateX: wave2TranslateX }],
            }}
          />

          <AnimatedPath
            fill={colors.primary}
            d="M0,160L48,149.3C96,139,192,117,288,112C384,107,480,117,576,133.3C672,149,768,171,864,165.3C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            style={{
              transform: [{ translateX: wave3TranslateX }],
            }}
          />
        </Svg>
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Sign in or create an account</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => navigation.navigate("Signup")}
          activeOpacity={0.8}
        >
          <Text style={styles.outlineButtonText}>Create Account</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
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
    width: "100%",
    height: 300,
    zIndex: -1,
    overflow: "hidden",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },

  title: {
    fontSize: 34,
    color: colors.text,
    fontWeight: "800",
    marginBottom: 6,
  },

  subtitle: {
    color: "#666",
    marginBottom: 40,
    fontSize: 16,
  },

  button: {
    backgroundColor: colors.primary,
    width: "80%",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  outlineButton: {
    width: "80%",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },

  outlineButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "700",
  },
});
