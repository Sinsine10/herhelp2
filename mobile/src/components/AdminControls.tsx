import { Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";
import { useAuth } from "../auth";

export function confirmDelete(message: string, onConfirm: () => void) {
  if (Platform.OS === "web") {
    if (typeof window !== "undefined" && window.confirm(message)) {
      onConfirm();
    }
    return;
  }
  Alert.alert("Delete", message, [
    { text: "Cancel", style: "cancel" },
    { text: "Delete", style: "destructive", onPress: onConfirm },
  ]);
}

export function AdminAddButton({ label, onPress }: { label: string; onPress: () => void }) {
  const { isAdmin } = useAuth();
  if (!isAdmin) return null;
  return (
    <Pressable style={styles.add} onPress={onPress}>
      <Text style={styles.addText}>{label}</Text>
    </Pressable>
  );
}

export function AdminActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  const { isAdmin } = useAuth();
  if (!isAdmin) return null;
  return (
    <View style={styles.row}>
      <Pressable style={styles.edit} onPress={onEdit}>
        <Text style={styles.editText}>Edit</Text>
      </Pressable>
      <Pressable style={styles.delete} onPress={onDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  add: {
    alignSelf: "flex-start",
    backgroundColor: colors.terracottaDark,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 14,
  },
  addText: { color: colors.white, fontWeight: "800", fontSize: 13 },
  row: { flexDirection: "row", gap: 8, marginTop: 10 },
  edit: {
    backgroundColor: colors.hoursBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editText: { color: colors.hoursText, fontWeight: "800" },
  delete: {
    backgroundColor: "#F8D7D3",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  deleteText: { color: "#9B1C1C", fontWeight: "800" },
});
