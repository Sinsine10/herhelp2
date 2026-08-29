import { useState, type ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme";

export function EditorScreen({
  title,
  onBack,
  onSave,
  saving,
  error,
  children,
}: {
  title: string;
  onBack: () => void;
  onSave: () => void;
  saving: boolean;
  error: string;
  children: ReactNode;
}) {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Pressable onPress={onBack}>
            <Text style={styles.back}>← BACK</Text>
          </Pressable>
          <Text style={styles.title}>{title}</Text>
          {children}
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Pressable style={styles.save} onPress={onSave} disabled={saving}>
            <Text style={styles.saveText}>{saving ? "Saving..." : "Save"}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function Field({
  label,
  value,
  onChangeText,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        placeholderTextColor={colors.muted}
      />
    </View>
  );
}

export function Toggle({
  label,
  value,
  onToggle,
}: {
  label: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable style={styles.toggle} onPress={onToggle}>
      <View style={[styles.box, value && styles.boxOn]} />
      <Text style={styles.toggleText}>{label}</Text>
    </Pressable>
  );
}

export function useSaving() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  return { saving, setSaving, error, setError };
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  back: { color: colors.navy, fontWeight: "700", fontSize: 12, letterSpacing: 0.6, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: "800", color: colors.navy, marginBottom: 18 },
  field: { marginBottom: 14 },
  label: { color: colors.label, fontSize: 11, fontWeight: "700", letterSpacing: 1, marginBottom: 6 },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.chipBorder,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.navy,
    fontSize: 15,
  },
  multiline: { minHeight: 90, textAlignVertical: "top" },
  toggle: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16 },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.terracotta,
    backgroundColor: colors.card,
  },
  boxOn: { backgroundColor: colors.terracotta },
  toggleText: { color: colors.navy, fontWeight: "700" },
  error: { color: "#B42318", marginBottom: 8 },
  save: {
    backgroundColor: colors.terracotta,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  saveText: { color: colors.white, fontWeight: "800", fontSize: 16 },
});
