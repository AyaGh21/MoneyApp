// src/screens/QRScanScreen.js
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import colors from "../theme/colors";

export default function QRScanScreen({ navigation }) {
  const [mode, setMode] = useState("scan");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={22} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>QR Scan</Text>

        <TouchableOpacity>
          <Feather name="info" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            mode === "myqr" ? styles.toggleActive : styles.toggleInactive,
          ]}
          onPress={() => setMode("myqr")}
        >
          <Text
            style={[
              styles.toggleText,
              mode === "myqr"
                ? styles.toggleActiveText
                : styles.toggleInactiveText,
            ]}
          >
            My QR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleBtn,
            mode === "scan" ? styles.toggleActive : styles.toggleInactive,
          ]}
          onPress={() => setMode("scan")}
        >
          <Text
            style={[
              styles.toggleText,
              mode === "scan"
                ? styles.toggleActiveText
                : styles.toggleInactiveText,
            ]}
          >
            Scan QR
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scanBoxWrapper}>
        {mode === "scan" ? (
          <View style={styles.scanBox} />
        ) : (
          <View style={styles.myQRWrapper}>
            <QRCode value="GHAZALI" size={200} color={colors.primary} />
            <Text style={styles.myQRLabel}>This is your personal QR code</Text>
          </View>
        )}
      </View>

      <Text style={styles.helperText}>
        {mode === "scan"
          ? "Hold your camera on QR code to scan"
          : "Show your QR to others to receive payments"}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },

  toggleRow: {
    flexDirection: "row",
    backgroundColor: "#f4f4f5",
    borderRadius: 999,
    padding: 4,
    marginBottom: 30,
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
  },

  toggleText: {
    fontSize: 14,
    fontWeight: "600",
  },

  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleActiveText: {
    color: "#fff",
  },

  toggleInactive: {
    backgroundColor: "transparent",
  },
  toggleInactiveText: {
    color: "#666",
  },

  scanBoxWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  scanBox: {
    width: 260,
    height: 260,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: colors.primary,
  },

  myQRWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,

    // shadow for iOS/Android
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  myQRLabel: {
    marginTop: 15,
    fontSize: 14,
    color: colors.primary,
  },

  helperText: {
    textAlign: "center",
    color: colors.primary,
    marginTop: 6,
  },
});
