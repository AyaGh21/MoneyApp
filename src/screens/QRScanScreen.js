// src/screens/QRScanScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function QRScanScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER ROW */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>QR Scan</Text>
        <TouchableOpacity>
          <Feather name="info" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* TOGGLE BUTTONS */}
      <View style={styles.toggleRow}>
        <TouchableOpacity style={[styles.toggleBtn, styles.toggleInactive]}>
          <Text style={[styles.toggleText, styles.toggleInactiveText]}>
            My QR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.toggleBtn, styles.toggleActive]}>
          <Text style={[styles.toggleText, styles.toggleActiveText]}>
            Scan QR
          </Text>
        </TouchableOpacity>
      </View>

      {/* SCAN AREA */}
      <View style={styles.scanBoxWrapper}>
        <View style={styles.scanBox} />
      </View>

      <Text style={styles.helperText}>Hold your camera on QR code to scan</Text>
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
    backgroundColor: colors.text,
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
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  scanBox: {
    width: 260,
    height: 260,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "#111",
  },
  helperText: {
    textAlign: "center",
    color: "#777",
    marginTop: 6,
  },
});
