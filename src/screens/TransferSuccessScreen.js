import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function TransferSuccessScreen({ route, navigation }) {
  const { id, username, amount, note } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* CHECK ICON */}
        <View style={styles.iconWrapper}>
          <View style={styles.iconCircle}>
            <Feather name="check" size={40} color="#fff" />
          </View>
        </View>

        <Text style={styles.title}>Money Transfer Successful</Text>
        <Text style={styles.subtitle}>Below are the information summary</Text>

        {/* SUMMARY CARD */}
        <View style={styles.summaryCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.value}>{id}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Sent to</Text>
            <Text style={styles.value}>{username}</Text>
          </View>

          {note ? (
            <View style={styles.row}>
              <Text style={styles.label}>Note</Text>
              <Text style={styles.value}>{note}</Text>
            </View>
          ) : null}

          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>${amount.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>{new Date().toLocaleTimeString()}</Text>
          </View>
        </View>

        {/* BUTTONS */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Text style={styles.homeBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },

  iconWrapper: { marginTop: 30, marginBottom: 20 },
  iconCircle: {
    backgroundColor: "#22c55e",
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
    marginTop: 4,
    marginBottom: 20,
  },

  summaryCard: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginTop: 10,
    borderColor: "#eee",
    borderWidth: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  label: { color: "#666" },
  value: { fontWeight: "600", color: "#111" },

  btnRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 30,
  },

  homeBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },

  homeBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
