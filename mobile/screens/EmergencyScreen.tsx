import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenTop } from "../src/components/Chrome";
import { AdminActions, AdminAddButton, confirmDelete } from "../src/components/AdminControls";
import { useAuth } from "../src/auth";
import { useContent } from "../src/content";
import { deleteEmergency } from "../src/api";
import { callNumber, colors } from "../src/theme";
import { useI18n } from "../src/i18n/LanguageContext";
import type { AppStackParamList, TabParamList } from "../src/types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Emergency">,
  NativeStackScreenProps<AppStackParamList>
>;

export default function EmergencyScreen({ navigation }: Props) {
  const { token } = useAuth();
  const { t } = useI18n();
  const { emergencies, refresh } = useContent();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTop backLabel={t("nav.home")} onBack={() => navigation.navigate("Home")} />
        <Text style={styles.title}>{t("emergency.title")}</Text>
        <Text style={styles.sub}>{t("emergency.sub")}</Text>
        <AdminAddButton
          label={t("admin.addNumber")}
          onPress={() => navigation.navigate("EditEmergency", {})}
        />
        {emergencies.map((item) => (
          <View key={item.id} style={styles.cardWrap}>
            <Pressable
              style={styles.card}
              onPress={() => Linking.openURL(callNumber(item.number))}
            >
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
              </View>
              <View style={styles.pill}>
                <Text style={styles.pillText}>{item.number}</Text>
              </View>
            </Pressable>
            <AdminActions
              onEdit={() => navigation.navigate("EditEmergency", { emergencyId: item.id })}
              onDelete={() =>
                confirmDelete(t("admin.deleteConfirm", { name: item.name }), async () => {
                  if (!token) return;
                  await deleteEmergency(token, item.id);
                  await refresh();
                })
              }
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  content: { paddingHorizontal: 20, paddingBottom: 32 },
  title: { fontSize: 32, fontWeight: "800", color: colors.navy },
  sub: { color: colors.muted, marginTop: 8, marginBottom: 20, lineHeight: 21 },
  cardWrap: { marginBottom: 12 },
  card: {
    backgroundColor: colors.terracottaDark,
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  name: { color: colors.white, fontWeight: "800", fontSize: 17 },
  desc: { color: "rgba(255,255,255,0.8)", marginTop: 4, lineHeight: 18 },
  pill: {
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillText: { color: colors.white, fontWeight: "800" },
});
