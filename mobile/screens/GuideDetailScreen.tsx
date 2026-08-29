import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenTop } from "../src/components/Chrome";
import { AdminActions, confirmDelete } from "../src/components/AdminControls";
import { useAuth } from "../src/auth";
import { useContent } from "../src/content";
import { deleteGuide } from "../src/api";
import { colors } from "../src/theme";
import { useI18n } from "../src/i18n/LanguageContext";
import type { AppStackParamList } from "../src/types";

type Props = NativeStackScreenProps<AppStackParamList, "GuideDetail">;

export default function GuideDetailScreen({ navigation, route }: Props) {
  const { token } = useAuth();
  const { t } = useI18n();
  const { guides, refresh } = useContent();
  const guide = guides.find((item) => item.id === route.params.guideId);

  if (!guide) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTop backLabel={t("nav.guides")} onBack={() => navigation.navigate("Tabs", { screen: "Learn" })} />
        <Text style={styles.title}>{guide.title}</Text>
        <Text style={styles.sub}>{guide.summary}</Text>
        <AdminActions
          onEdit={() => navigation.navigate("EditGuide", { guideId: guide.id })}
          onDelete={() =>
            confirmDelete(t("admin.deleteConfirm", { name: guide.title }), async () => {
              if (!token) return;
              await deleteGuide(token, guide.id);
              await refresh();
              navigation.navigate("Tabs", { screen: "Learn" });
            })
          }
        />
        <View style={styles.card}>
          <Text style={styles.body}>{guide.intro}</Text>
          {guide.heading ? <Text style={styles.heading}>{guide.heading}</Text> : null}
          {(guide.bullets ?? []).map((bullet) => (
            <Text key={bullet} style={styles.bullet}>
              - {bullet}
            </Text>
          ))}
          <Text style={[styles.body, styles.footer]}>{guide.footer}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  content: { paddingHorizontal: 20, paddingBottom: 36 },
  title: { fontSize: 30, fontWeight: "800", color: colors.navy, lineHeight: 36 },
  sub: { color: colors.muted, marginTop: 10, marginBottom: 12, lineHeight: 21 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.chipBorder,
    padding: 20,
    marginTop: 14,
  },
  body: { color: "#4A5563", fontSize: 16, lineHeight: 24 },
  heading: { color: colors.navy, fontWeight: "800", marginTop: 18, marginBottom: 10, fontSize: 16 },
  bullet: { color: "#4A5563", fontSize: 16, lineHeight: 24, marginBottom: 10 },
  footer: { marginTop: 12 },
});
