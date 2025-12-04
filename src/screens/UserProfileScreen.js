import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function UserProfileScreen({ navigation }) {
  const [name, setName] = useState("Aya Ghazali");
  const [email, setEmail] = useState("aya@example.com");
  const [phone, setPhone] = useState("+961 70 000 000");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.headerSection}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>{name.charAt(0)}</Text>
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setIsEditing((prev) => !prev)}
          >
            <Feather name="edit-2" size={14} color="#fff" />
            <Text style={styles.editBtnText}>
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>

          <View style={styles.inputWrapper}>
            <Feather name="user" size={18} color="#999" style={styles.icon} />
            <TextInput
              value={name}
              onChangeText={setName}
              editable={isEditing}
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Feather name="mail" size={18} color="#999" style={styles.icon} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              editable={isEditing}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Feather name="phone" size={18} color="#999" style={styles.icon} />
            <TextInput
              value={phone}
              onChangeText={setPhone}
              editable={isEditing}
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Security & Settings</Text>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <View style={styles.optionLeft}>
              <Feather name="lock" size={20} color={colors.primary} />
              <Text style={styles.optionText}>Change Password</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("ChangePin")}
          >
            <View style={styles.optionLeft}>
              <Feather name="lock" size={20} color={colors.primary} />
              <Text style={styles.optionText}>Change PIN</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <Feather name="bell" size={20} color={colors.primary} />
              <Text style={styles.optionText}>Notifications</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("Support")}
          >
            <View style={styles.optionLeft}>
              <Feather name="help-circle" size={20} color={colors.primary} />
              <Text style={styles.optionText}>Support & Contact</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#bbb" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.navigate("Login")}
        >
          <Feather name="log-out" size={18} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

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

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },

  backBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 10,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarInitial: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "900",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginTop: 10,
  },

  email: { color: "#666", fontSize: 13 },

  editBtn: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
  },

  editBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 6,
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
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 15,
  },

  inputWrapper: {
    flexDirection: "row",
    backgroundColor: colors.lightGray,
    alignItems: "center",
    paddingHorizontal: 12,
    height: 50,
    borderRadius: 14,
    marginBottom: 14,
  },

  icon: { marginRight: 10 },

  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },

  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  optionText: {
    fontSize: 15,
    color: colors.text,
  },

  logoutBtn: {
    backgroundColor: "#ef4444",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
