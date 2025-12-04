import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import colors from "../theme/colors";
import * as Clipboard from "expo-clipboard";

export default function ReceiveMoneyScreen({ navigation }) {
  const [currency, setCurrency] = useState("USD");

  // request form state
  const [requestUser, setRequestUser] = useState("");
  const [requestAmount, setRequestAmount] = useState("");
  const [requestNote, setRequestNote] = useState("");

  const walletId = "PC-NG-005291";

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied!", "Wallet info has been copied.");
  };

  // Handle Request Money Action
  const handleRequest = () => {
    const amt = parseFloat(requestAmount);

    if (!requestUser.trim() || isNaN(amt) || amt <= 0) {
      Alert.alert("Invalid Input", "Enter a valid user and amount.");
      return;
    }

    // send to Dashboard
    navigation.navigate("MainTabs", {
      screen: "Home",
      params: {
        newRequest: {
          username: requestUser.trim(),
          amount: amt,
          note: requestNote.trim(),
        },
      },
    });

    // reset input fields
    setRequestAmount("");
    setRequestUser("");
    setRequestNote("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <Text style={styles.title}>Receive Money</Text>
        <Text style={styles.description}>
          Share your wallet details or request money from someone.
        </Text>

        {/* WALLET ADDRESS CARD */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Your Wallet Address</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.walletText}>{walletId}</Text>

            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => copyToClipboard(walletId)}
            >
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <Text style={styles.cardLabel}>Currency</Text>

          <View style={styles.currencyRow}>
            {["NGN", "USD", "EUR"].map((c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.currencyButton,
                  currency === c && styles.currencySelected,
                ]}
                onPress={() => setCurrency(c)}
              >
                <Text
                  style={[
                    styles.currencyText,
                    currency === c && styles.currencyTextSelected,
                  ]}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* QR CODE CARD */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>QR Code</Text>

          <View style={{ alignItems: "center", marginVertical: 16 }}>
            <QRCode
              value={`${walletId}-${currency}`}
              size={140}
              color={colors.primary}
              backgroundColor="white"
            />
          </View>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => copyToClipboard(`${walletId}-${currency}`)}
          >
            <Text style={styles.copyButtonText}>Copy QR code</Text>
          </TouchableOpacity>
        </View>

        {/* REQUEST FROM SOMEONE */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Request Money From Someone</Text>

          <TextInput
            style={styles.input}
            placeholder="Username / ID / Phone"
            value={requestUser}
            onChangeText={setRequestUser}
          />

          <TextInput
            style={styles.input}
            placeholder="Amount (USD)"
            value={requestAmount}
            onChangeText={setRequestAmount}
            keyboardType="numeric"
          />

          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Message (optional)"
            value={requestNote}
            multiline
            onChangeText={setRequestNote}
          />

          <TouchableOpacity
            style={styles.requestButton}
            onPress={handleRequest}
          >
            <Text style={styles.requestText}>Send Request</Text>
          </TouchableOpacity>
        </View>

        {/* CTA BUTTON */}
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>Share Wallet Info</Text>
        </TouchableOpacity>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================ STYLES ============================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },

  container: {
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginTop: 10,
  },

  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    marginTop: 6,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 10,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  walletText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },

  copyButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  copyButtonText: {
    color: colors.primary,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 14,
  },

  currencyRow: {
    flexDirection: "row",
    gap: 10,
  },

  currencyButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
  },

  currencyText: {
    fontWeight: "600",
    color: colors.text,
  },

  currencySelected: {
    backgroundColor: colors.primary,
  },

  currencyTextSelected: {
    color: "#fff",
  },

  input: {
    backgroundColor: colors.lightGray,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },

  requestButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 6,
  },

  requestText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },

  ctaText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
