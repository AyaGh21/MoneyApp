import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import colors from "../theme/colors";

export default function ManageQuickSendScreen({ route, navigation }) {
  const { quickSend, setQuickSend } = route.params;

  const [localList, setLocalList] = useState([...quickSend]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      setQuickSend(localList); // Send updated list back
    });

    return unsubscribe;
  }, [localList]);

  const openEditModal = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditUsername(user.username);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (!editName.trim() || !editUsername.trim()) {
      Alert.alert("Missing info", "Both fields are required.");
      return;
    }

    setLocalList((prev) =>
      prev.map((u) =>
        u.id === editingUser.id
          ? { ...u, name: editName.trim(), username: editUsername.trim() }
          : u
      )
    );

    setEditModalVisible(false);
  };

  const deleteUser = (user) => {
    Alert.alert("Remove Contact", `Remove ${user.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setLocalList((prev) => prev.filter((u) => u.id !== user.id));
        },
      },
    ]);
  };

  const moveUp = (index) => {
    if (index === 0) return;

    const newList = [...localList];
    const temp = newList[index - 1];
    newList[index - 1] = newList[index];
    newList[index] = temp;

    setLocalList(newList);
  };

  const moveDown = (index) => {
    if (index === localList.length - 1) return;

    const newList = [...localList];
    const temp = newList[index + 1];
    newList[index + 1] = newList[index];
    newList[index] = temp;

    setLocalList(newList);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <View style={[styles.avatar, { backgroundColor: item.color }]}>
        <Text style={styles.avatarText}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>{item.username}</Text>
      </View>

      <TouchableOpacity onPress={() => moveUp(index)}>
        <Text style={styles.reorderBtn}>↑</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => moveDown(index)}>
        <Text style={styles.reorderBtn}>↓</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openEditModal(item)}>
        <Text style={styles.editBtn}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteUser(item)}>
        <Text style={styles.deleteBtn}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.header}>Manage Quick Send</Text>

      <FlatList
        data={localList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
      />

      {/* EDIT MODAL */}
      <Modal transparent visible={editModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Edit User</Text>

            <TextInput
              value={editName}
              onChangeText={setEditName}
              placeholder="Name"
              style={styles.modalInput}
            />

            <TextInput
              value={editUsername}
              onChangeText={setEditUsername}
              placeholder="Username / ID"
              style={styles.modalInput}
            />

            <View style={styles.modalBtns}>
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={saveEdit} style={styles.saveBtn}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },

  header: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 20,
    color: colors.text,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  avatarText: { color: "#fff", fontSize: 20, fontWeight: "700" },

  name: { fontSize: 16, fontWeight: "700", color: colors.text },
  username: { fontSize: 12, color: "#666" },

  reorderBtn: {
    fontSize: 22,
    marginHorizontal: 8,
    color: colors.primary,
  },

  editBtn: {
    marginHorizontal: 8,
    color: "#2563eb",
    fontWeight: "700",
  },

  deleteBtn: {
    marginHorizontal: 8,
    color: "#ef4444",
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalBox: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  modalInput: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  modalBtns: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  cancelBtn: { marginRight: 12, padding: 8 },
  cancelText: { color: "#ef4444", fontWeight: "600" },

  saveBtn: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },

  saveText: { color: "#fff", fontWeight: "700" },
});
