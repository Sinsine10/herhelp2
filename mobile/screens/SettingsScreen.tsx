import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../src/auth";
import { colors, initials } from "../src/theme";
import type { AppStackParamList } from "../src/types";

type Props = NativeStackScreenProps<AppStackParamList, "Settings">;

export default function SettingsScreen({ navigation }: Props) {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>← BACK</Text>
        </Pressable>

        <Text style={styles.title}>Settings</Text>
        <Text style={styles.sub}>Your account stays private on this device.</Text>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.initials}>{initials(user?.fullName)}</Text>
          </View>
          <Text style={styles.name}>{user?.fullName}</Text>
          <Text style={styles.role}>{user?.role === "admin" ? "Admin" : "User"}</Text>

          <Text style={styles.label}>EMAIL</Text>
          <Text style={styles.value}>{user?.email || "Not set"}</Text>
          <Text style={[styles.label, styles.spaced]}>PHONE</Text>
          <Text style={styles.value}>{user?.phone}</Text>
        </View>

        <Pressable style={styles.logout} onPress={() => signOut()}>
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  content: { paddingHorizontal: 20, paddingBottom: 32 },
  back: {
    color: colors.navy,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    marginBottom: 18,
  },
  title: { fontSize: 32, fontWeight: "800", color: colors.navy },
  sub: { color: colors.muted, marginTop: 8, marginBottom: 20, lineHeight: 21 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.avatar,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  initials: { color: colors.avatarText, fontWeight: "800", fontSize: 20 },
  name: { color: colors.navy, fontWeight: "800", fontSize: 20 },
  role: { color: colors.muted, marginTop: 4, marginBottom: 20 },
  label: {
    alignSelf: "stretch",
    color: colors.label,
    fontSize: 11,
    letterSpacing: 1.2,
    fontWeight: "700",
  },
  spaced: { marginTop: 14 },
  value: {
    alignSelf: "stretch",
    color: colors.navy,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  logout: {
    marginTop: 24,
    backgroundColor: colors.terracottaDark,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
  },
  logoutText: { color: colors.white, fontWeight: "800", fontSize: 16 },
});
