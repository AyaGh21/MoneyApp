import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import colors from "../theme/colors";

export default function SendMoneyScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  // Fake balance — real balance will be handled in DashboardScreen
  const userBalance = 4485.3;

  const handleSend = () => {
    const numeric = parseFloat(amount.replace(",", "."));

    if (!username.trim()) {
      Alert.alert("Missing username", "Enter a username / phone number / ID.");
      return;
    }

    if (isNaN(numeric) || numeric <= 0) {
      Alert.alert("Invalid amount", "Enter a valid amount greater than 0.");
      return;
    }

    if (numeric > userBalance) {
      Alert.alert("Insufficient Funds", "You cannot send more than you have.");
      return;
    }

    // Sending data back to Dashboard
    const transferId = Date.now().toString();

    navigation.navigate("TransferSuccess", {
      id: transferId,
      username,
      note,
      amount: numeric,
    });

    // Also send to dashboard AFTER success
    setTimeout(() => {
      navigation.navigate("MainTabs", {
        screen: "Home",
        params: {
          newSentTransfer: {
            id: transferId,
            username,
            note,
            amount: numeric,
          },
        },
      });
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.title}>Send Money</Text>
          <Text style={styles.subtitle}>
            Enter the details below to transfer money.
          </Text>

          {/* USERNAME */}
          <Text style={styles.label}>Recipient Username / Phone / ID</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. @ali or +961700000"
            value={username}
            onChangeText={setUsername}
          />

          {/* AMOUNT */}
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="USD"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          {/* NOTE */}
          <Text style={styles.label}>Note (optional)</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Add a message"
            multiline
            value={note}
            onChangeText={setNote}
          />

          {/* BUTTON */}
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendText}>Send Money</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

// ------------------ STYLES ------------------

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
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    marginTop: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: colors.text,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sendButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 10,
    alignItems: "center",
  },
  sendText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
