import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function SupportScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* ---------- HEADER ---------- */}
        <View style={styles.headerSection}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Support & Contact</Text>
        </View>

        {/* ---------- CONTACT FORM ---------- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact Us</Text>

          {/* Name */}
          <View style={styles.inputWrapper}>
            <Feather name="user" size={18} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email */}
          <View style={styles.inputWrapper}>
            <Feather name="mail" size={18} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              keyboardType="email-address"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Message */}
          <View
            style={[
              styles.inputWrapper,
              { height: 120, alignItems: "flex-start" },
            ]}
          >
            <Feather name="message-circle" size={18} color="#888" />
            <TextInput
              style={[
                styles.input,
                { height: "100%", textAlignVertical: "top" },
              ]}
              placeholder="How can we help you?"
              multiline
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        {/* ---------- FAQ SECTION ---------- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Frequently Asked</Text>

          {[
            "How do I reset my password?",
            "Why is my transfer pending?",
            "How to change my phone number?",
            "How do I delete my account?",
          ].map((q, i) => (
            <TouchableOpacity key={i} style={styles.faqRow}>
              <Text style={styles.faqText}>{q}</Text>
              <Feather name="chevron-right" size={18} color="#bbb" />
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------- CUSTOMER SERVICE ---------- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Customer Service</Text>

          <View style={styles.infoRow}>
            <Feather name="phone-call" size={18} color={colors.primary} />
            <Text style={styles.infoText}>+1 (800) 123-4567</Text>
          </View>

          <View style={styles.infoRow}>
            <Feather name="mail" size={18} color={colors.primary} />
            <Text style={styles.infoText}>support@moneyapp.com</Text>
          </View>
        </View>

        {/* ---------- LINKS ---------- */}
        <View style={styles.bottomLinks}>
          <TouchableOpacity>
            <Text style={styles.link}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.link}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* --------------------- STYLES --------------------- */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  waveContainer: { height: 180, width: "100%", marginBottom: -50 },

  headerSection: {
    position: "absolute",
    top: 55,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 10,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
    marginTop: 50,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 15,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 14,
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  faqRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  faqText: { color: colors.text, fontSize: 15 },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  infoText: {
    color: colors.text,
    fontSize: 15,
  },

  bottomLinks: {
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },

  link: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 14,
  },
});
