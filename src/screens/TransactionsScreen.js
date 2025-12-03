import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import colors from "../theme/colors";
import { Feather } from "@expo/vector-icons";

export default function TransactionsScreen({ route, navigation }) {
  const allTransactions = route?.params?.allTransactions || [];

  // ---------------- FILTER STATE ----------------
  const [typeFilter, setTypeFilter] = useState("all"); // all | sent | received | request
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const formatDate = (iso) => {
    if (!iso) return "Unknown date";
    const d = new Date(iso);
    return (
      d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      "  •  " +
      d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const parseDate = (d) => {
    if (!d) return null;
    const parts = d.includes("/") ? d.split("/") : d.split("-");
    if (parts.length !== 3) return null;

    let [y, m, d2] = parts.map(Number);
    return new Date(y, m - 1, d2).getTime();
  };

  // ---------------- TOTAL SENT & RECEIVED ----------------
  const totalSent = allTransactions
    .filter((t) => !t.isIncoming)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalReceived = allTransactions
    .filter((t) => t.isIncoming)
    .reduce((sum, t) => sum + t.amount, 0);

  // ---------------- APPLY FILTERS ----------------
  const filtered = useMemo(() => {
    return allTransactions.filter((t) => {
      // TYPE FILTER
      if (typeFilter === "sent" && t.isIncoming) return false;
      if (typeFilter === "received" && !t.isIncoming) return false;
      if (typeFilter === "request" && !t.isRequest) return false;

      // DATE FILTER (your data has no date → treat them as today)
      const txDate = new Date().getTime();
      const from = parseDate(fromDate);
      const to = parseDate(toDate);

      if (from && txDate < from) return false;
      if (to && txDate > to) return false;

      return true;
    });
  }, [typeFilter, fromDate, toDate, allTransactions]);

  // ---------------- RENDER ITEM ----------------
  const renderItem = ({ item }) => {
    const amountColor = item.isIncoming
      ? "#22c55e"
      : item.isRequest
      ? "#9a0c9a"
      : "#ef4444";

    return (
      <View style={styles.item}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>
            {item.isIncoming ? "From " : "To "}
            {item.username}
            {item.note ? ` • ${item.note}` : ""}
          </Text>

          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
        </View>

        <Text style={[styles.amount, { color: amountColor }]}>
          ${Math.abs(item.amount).toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {/* HEADER ROW WITH BACK BUTTON */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={22} color={colors.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Transaction History</Text>

          {/* empty box to balance spacing */}
          <View style={{ width: 22 }} />
        </View>

        {/* ----------- TOTAL SUMMARY ----------- */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>Total Received</Text>
            <Text style={[styles.summaryValue, { color: "#19c116ff" }]}>
              ${totalReceived.toFixed(2)}
            </Text>
          </View>

          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>Total Sent</Text>
            <Text style={[styles.summaryValue, { color: "#ef4444" }]}>
              ${totalSent.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* ----------- FILTER SECTION ----------- */}
        <View style={styles.filterBox}>
          <View style={styles.typeRow}>
            {[
              { key: "all", label: "All" },
              { key: "sent", label: "Sent" },
              { key: "received", label: "Received" },
              { key: "request", label: "Requests" },
            ].map((btn) => (
              <TouchableOpacity
                key={btn.key}
                style={[
                  styles.filterButton,
                  typeFilter === btn.key && styles.filterButtonActive,
                ]}
                onPress={() => setTypeFilter(btn.key)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    typeFilter === btn.key && styles.filterButtonTextActive,
                  ]}
                >
                  {btn.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* DATE FILTER */}
          <View style={styles.dateRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.dateLabel}>From</Text>
              <TextInput
                placeholder="YYYY-MM-DD"
                style={styles.dateInput}
                value={fromDate}
                onChangeText={setFromDate}
              />
            </View>

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.dateLabel}>To</Text>
              <TextInput
                placeholder="YYYY-MM-DD"
                style={styles.dateInput}
                value={toDate}
                onChangeText={setToDate}
              />
            </View>
          </View>
        </View>

        {/* ----------- TRANSACTIONS LIST ----------- */}
        {filtered.length === 0 ? (
          <Text style={styles.empty}>No transactions found.</Text>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
            contentContainerStyle={{ padding: 20 }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },

  header: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    color: colors.text,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },

  summaryBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingVertical: 10,
  },
  summaryBlock: { alignItems: "center" },
  summaryLabel: { fontSize: 13, color: "#666" },
  summaryValue: { fontSize: 20, fontWeight: "700" },

  filterBox: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  typeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  filterButtonText: {
    color: colors.text,
    fontWeight: "600",
  },

  filterButtonTextActive: {
    color: "#fff",
  },

  dateRow: { flexDirection: "row", marginBottom: 6 },

  dateLabel: { fontSize: 12, color: "#666", marginBottom: 4 },

  dateInput: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  title: { fontWeight: "700", fontSize: 15, color: colors.text },
  subtitle: { fontSize: 12, color: "#666", marginTop: 2 },

  amount: { fontWeight: "700", fontSize: 15 },

  empty: {
    marginTop: 40,
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
  dateText: {
    fontSize: 10,
    color: "#999",
    marginTop: 2,
  },
});
