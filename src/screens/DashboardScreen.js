import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../theme/colors";

const visaLogo = require("../../assets/visa.png");
const chipImage = require("../../assets/chip.png");

const UPCOMING = [
  {
    id: "1",
    title: "Spotify Premium",
    date: "26 Feb 2025",
    amount: -14.99,
  },
  {
    id: "2",
    title: "Gym Membership",
    date: "01 Mar 2025",
    amount: -35.0,
  },
];

const INITIAL_RECENT = [
  {
    id: "1",
    title: "Dribbble",
    username: "dribbble",
    note: "Pro upgrade",
    amount: -340.0,
    isIncoming: false,
    date: "2025-01-18",
  },
  {
    id: "2",
    title: "Coffee",
    username: "sara",
    note: "told you i'll pay you back",
    amount: 15.0,
    isIncoming: true,
    date: "2025-12-31",
  },
  {
    id: "3",
    title: "Taxi",
    username: "mark",
    note: "sorry i forgot :(",
    amount: -20.0,
    isIncoming: false,
    date: "2025-02-28",
  },
];

export default function DashboardScreen({ route, navigation }) {
  const [balance, setBalance] = useState(4485.3);

  const [quickSend, setQuickSend] = useState([
    { id: "1", name: "Ken", username: "@ken01", color: "#f97316" },
    { id: "2", name: "Ann", username: "@ann", color: "#22c55e" },
    { id: "3", name: "Mary", username: "@mary", color: "#3b82f6" },
    { id: "4", name: "Helen", username: "@helen", color: "#e11d48" },
  ]);

  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [pendingTransfers, setPendingTransfers] = useState([
    {
      id: "991",
      username: "@john",
      amount: 50,
      note: "Thanks for yesterday",
    },
  ]);

  const [recent, setRecent] = useState(INITIAL_RECENT);

  const [moneyModalVisible, setMoneyModalVisible] = useState(false);
  const [moneyMode, setMoneyMode] = useState("send");
  const [moneyUsername, setMoneyUsername] = useState("");
  const [moneyAmount, setMoneyAmount] = useState("");
  const [moneyNote, setMoneyNote] = useState("");

  const [showCardNumber, setShowCardNumber] = useState(false);

  React.useEffect(() => {
    if (route?.params?.newRequest) {
      const r = route.params.newRequest;

      setRecent((prev) => [
        {
          id: Date.now().toString(),
          title: "Request",
          username: r.username,
          note: r.note,
          amount: r.amount,
          isIncoming: false,
          isRequest: true,
          date: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  }, [route?.params?.newRequest]);

  React.useEffect(() => {
    if (route?.params?.newSentTransfer) {
      const t = route.params.newSentTransfer;

      setBalance((prev) => prev - t.amount);

      setRecent((prev) => [
        {
          id: t.id,
          title: "Transfer",
          username: t.username,
          note: t.note,
          amount: -t.amount,
          isIncoming: false,
          date: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  }, [route?.params?.newSentTransfer]);

  const addUser = () => {
    if (!newName.trim() || !newUsername.trim()) {
      Alert.alert("Missing info", "Please enter both name and username.");
      return;
    }

    setQuickSend((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newName.trim(),
        username: newUsername.trim(),
        color: `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")}`,
      },
    ]);

    setNewName("");
    setNewUsername("");
    setAddUserModalVisible(false);
  };

  const deleteUser = (id, name) => {
    Alert.alert("Remove Contact", `Do you want to remove ${name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setQuickSend((prev) => prev.filter((u) => u.id !== id));
        },
      },
    ]);
  };

  const openMoneyModal = (mode, username = "") => {
    setMoneyMode(mode);
    setMoneyUsername(username);
    setMoneyAmount("");
    setMoneyNote("");
    setMoneyModalVisible(true);
  };

  const handleConfirmMoney = () => {
    const numericAmount = parseFloat(moneyAmount.replace(",", "."));

    if (!moneyUsername.trim() || isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert(
        "Invalid data",
        "Please enter a valid username and amount greater than 0."
      );
      return;
    }

    const isSend = moneyMode === "send";

    if (isSend) {
      if (numericAmount > balance) {
        Alert.alert(
          "Insufficient Balance",
          "You don't have enough money to complete this transfer."
        );
        return;
      }

      setBalance((prev) => prev - numericAmount);

      setRecent((prev) => [
        {
          id: Date.now().toString(),
          title: "Transfer",
          username: moneyUsername.trim(),
          note: moneyNote.trim(),
          amount: -numericAmount,
          isIncoming: false,
          date: new Date().toISOString(),
        },
        ...prev,
      ]);
    } else {
      setRecent((prev) => [
        {
          id: Date.now().toString(),
          title: "Request",
          username: moneyUsername.trim(),
          note: moneyNote.trim(),
          amount: numericAmount,
          isIncoming: false,
          isPending: true,
          date: new Date().toISOString(),
        },
        ...prev,
      ]);
    }

    setMoneyModalVisible(false);
  };

  const acceptTransfer = (t) => {
    setBalance((prev) => prev + t.amount);

    setRecent((prev) => [
      {
        id: Date.now().toString(),
        title: "Received",
        username: t.username,
        note: t.note,
        amount: t.amount,
        isIncoming: true,
        date: new Date().toISOString(),
      },
      ...prev,
    ]);

    setPendingTransfers((prev) => prev.filter((x) => x.id !== t.id));
  };

  const denyTransfer = (id) => {
    setPendingTransfers((prev) => prev.filter((t) => t.id !== id));
  };

  const formatAmount = (value) => {
    const sign = value >= 0 ? "+" : "-";
    return `${sign}$${Math.abs(value).toFixed(2)}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingText}>Welcome,</Text>
            <Text style={styles.userNameText}>Aya Ghazali</Text>
          </View>

          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.avatarInitial}>A</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => setShowCardNumber(!showCardNumber)}
        >
          <View style={styles.cardTopRow}>
            <Image source={chipImage} style={styles.chip} />
            <Image source={visaLogo} style={styles.visaLogo} />
          </View>

          <Text style={styles.cardLabel}>Current balance</Text>
          <Text style={styles.cardBalance}>${balance.toFixed(2)}</Text>

          <View style={styles.cardNumberRow}>
            {showCardNumber ? (
              <>
                <Text style={styles.cardNumber}>1234</Text>
                <Text style={styles.cardNumber}>5678</Text>
                <Text style={styles.cardNumber}>9012</Text>
                <Text style={styles.cardNumber}>1289</Text>
              </>
            ) : (
              <>
                <Text style={styles.cardNumber}>****</Text>
                <Text style={styles.cardNumber}>****</Text>
                <Text style={styles.cardNumber}>****</Text>
                <Text style={styles.cardNumber}>1289</Text>
              </>
            )}
          </View>
          <TouchableOpacity
            onPress={() => setShowCardNumber(!showCardNumber)}
            style={{ alignSelf: "center", marginTop: 8 }}
          >
            <MaterialCommunityIcons
              name="face-recognition"
              size={28}
              color="#fff"
            />
          </TouchableOpacity>

          <View style={styles.cardBottomRow}>
            <View>
              <Text style={styles.smallLabel}>CARD HOLDER</Text>
              <Text style={styles.smallValue}>ALI GHAZALI</Text>
            </View>
            <View>
              <Text style={styles.smallLabel}>VALID THRU</Text>
              <Text style={styles.smallValue}>09/26</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("SendMoney")}
          >
            <Feather name="arrow-up-right" size={20} color={colors.primary} />
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("ReceiveMoney")}
          >
            <Feather name="arrow-down-left" size={20} color={colors.primary} />
            <Text style={styles.actionText}>Request</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigation.navigate("Transactions", { allTransactions: recent })
            }
          >
            <Feather name="clock" size={20} color={colors.primary} />
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Quick send</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ManageQuickSend", {
                quickSend,
                setQuickSend,
              })
            }
          >
            <Text style={styles.sectionLink}>Manage</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickRow}
        >
          <TouchableOpacity
            style={styles.quickAddWrapper}
            onPress={() => setAddUserModalVisible(true)}
          >
            <View style={styles.addCircle}>
              <Text style={styles.addPlus}>+</Text>
            </View>
            <Text style={styles.quickName}>Add</Text>
          </TouchableOpacity>

          {quickSend.map((u) => (
            <TouchableOpacity
              key={u.id}
              onPress={() => openMoneyModal("send", u.username || u.name)}
              onLongPress={() => deleteUser(u.id, u.name)}
              delayLongPress={450}
              style={styles.quickItem}
            >
              <View style={[styles.quickAvatar, { backgroundColor: u.color }]}>
                <Text style={styles.quickAvatarText}>
                  {u.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.quickName}>{u.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {pendingTransfers.length > 0 && (
          <>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Incoming transfers</Text>
            </View>

            {pendingTransfers.map((t) => (
              <View key={t.id} style={styles.pendingBox}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.pendingUser}>From {t.username}</Text>
                  {t.note ? (
                    <Text style={styles.pendingNote}>{t.note}</Text>
                  ) : null}
                  <Text style={styles.pendingAmount}>
                    +${t.amount.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.pendingButtons}>
                  <TouchableOpacity
                    style={styles.acceptBtn}
                    onPress={() => acceptTransfer(t)}
                  >
                    <Text style={styles.acceptText}>Accept</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.denyBtn}
                    onPress={() => denyTransfer(t.id)}
                  >
                    <Text style={styles.denyText}>Deny</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Upcoming payments</Text>
          <Text style={styles.sectionLink}>See all</Text>
        </View>

        {UPCOMING.map((p) => (
          <View key={p.id} style={styles.listItem}>
            <View style={styles.listTextBlock}>
              <Text style={styles.listTitle}>{p.title}</Text>
              <Text style={styles.listSubtitle}>{p.date}</Text>
            </View>
            <Text style={styles.upcomingAmount}>{formatAmount(p.amount)}</Text>
          </View>
        ))}

        <View style={[styles.sectionHeaderRow, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Recent transactions</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Transactions", { allTransactions: recent })
            }
          >
            <Text style={styles.sectionLink}>View all</Text>
          </TouchableOpacity>
        </View>

        {recent.map((t) => {
          let amountColor = "#ef4444";

          if (t.isIncoming) {
            amountColor = "#22c55e";
          }

          if (t.isRequest) {
            amountColor = "#9a0c9aff";
          }

          return (
            <View key={t.id} style={styles.listItem}>
              <View style={styles.listTextBlock}>
                <Text style={styles.listTitle}>{t.title}</Text>
                <Text style={styles.listSubtitle}>
                  {t.isIncoming ? `From ${t.username}` : `To ${t.username}`}
                  {t.note ? ` • ${t.note}` : ""}
                </Text>
              </View>
              <Text style={[styles.recentAmount, { color: amountColor }]}>
                {formatAmount(t.amount)}
              </Text>
            </View>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
      {/* ADD USER MODAL */}
      <Modal transparent visible={addUserModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add User</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Full name"
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Username / Phone Number / ID"
              value={newUsername}
              onChangeText={setNewUsername}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setAddUserModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalAdd} onPress={addUser}>
                <Text style={styles.modalAddText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={moneyModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {moneyMode === "send" ? "Send Money" : "Request Money"}
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Username"
              value={moneyUsername}
              onChangeText={setMoneyUsername}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Amount (USD)"
              keyboardType="numeric"
              value={moneyAmount}
              onChangeText={setMoneyAmount}
            />

            <TextInput
              style={[styles.modalInput, { height: 80 }]}
              placeholder="Note (optional)"
              multiline
              value={moneyNote}
              onChangeText={setMoneyNote}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setMoneyModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalAdd}
                onPress={handleConfirmMoney}
              >
                <Text style={styles.modalAddText}>
                  {moneyMode === "send" ? "Send" : "Request"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 4,
  },
  greetingText: { fontSize: 14, color: "#999" },
  userNameText: { fontSize: 22, fontWeight: "700", color: colors.text },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: { color: "#fff", fontWeight: "700", fontSize: 16 },

  card: {
    backgroundColor: "#2a053cff",
    padding: 20,
    borderRadius: 22,
    marginBottom: 20,
    marginTop: 8,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  chip: { width: 42, height: 32, resizeMode: "contain" },
  visaLogo: { width: 60, height: 26, resizeMode: "contain" },
  cardLabel: { color: "#94A3B8", fontSize: 12 },
  cardBalance: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginVertical: 10,
  },
  cardNumberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardNumber: { color: "#fff", fontSize: 16, letterSpacing: 2 },
  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallLabel: { color: "#94A3B8", fontSize: 10 },
  smallValue: { color: "#fff", fontWeight: "600", fontSize: 13, marginTop: 3 },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    gap: 4,
    flexDirection: "row",
  },

  actionText: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 14,
  },

  actionPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  actionText: {
    color: colors.text,
    fontWeight: "600",
  },
  actionPrimaryText: {
    color: "#fff",
    fontWeight: "700",
  },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginTop: 25,
  },
  sectionLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
    marginTop: 25,
  },

  quickRow: { paddingVertical: 8 },
  quickAddWrapper: { alignItems: "center", marginRight: 18 },
  addCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addPlus: { fontSize: 28, color: colors.primary, marginTop: -3 },
  quickItem: { alignItems: "center", marginRight: 18 },
  quickAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  quickAvatarText: { color: "#fff", fontWeight: "700", fontSize: 22 },
  quickName: { marginTop: 4, color: colors.text, fontSize: 12 },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listTextBlock: { flex: 1 },
  listTitle: { fontSize: 15, fontWeight: "600", color: colors.text },
  listSubtitle: { color: "#666", fontSize: 12, marginTop: 2 },

  upcomingAmount: {
    fontWeight: "600",
    color: "#ef4444",
  },

  recentAmount: {
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
  },
  modalTitle: { fontWeight: "700", fontSize: 20, marginBottom: 15 },
  modalInput: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  modalCancel: { marginRight: 16, paddingVertical: 8 },
  modalCancelText: { color: "#ef4444", fontWeight: "600" },
  modalAdd: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  modalAddText: { color: "#fff", fontWeight: "700" },

  pendingItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  pendingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pendingActions: {
    flexDirection: "row",
    gap: 10,
  },

  pendingBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  pendingBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    backgroundColor: "#fff",
  },

  pendingUser: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },

  pendingNote: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  pendingAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 6,
  },

  pendingButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 12,
  },

  acceptBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#22c55e",
  },

  denyBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#ef4444",
  },

  acceptText: {
    color: "#fff",
    fontWeight: "700",
  },

  denyText: {
    color: "#fff",
    fontWeight: "700",
  },
});
