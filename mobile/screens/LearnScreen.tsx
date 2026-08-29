import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenTop } from "../src/components/Chrome";
import { FilterChips } from "../src/components/FilterChips";
import { AdminActions, AdminAddButton, confirmDelete } from "../src/components/AdminControls";
import { useAuth } from "../src/auth";
import { useContent } from "../src/content";
import { deleteGuide } from "../src/api";
import { colors } from "../src/theme";
import { useI18n } from "../src/i18n/LanguageContext";
import type { AppStackParamList, TabParamList } from "../src/types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Learn">,
  NativeStackScreenProps<AppStackParamList>
>;

export default function LearnScreen({ navigation }: Props) {
  const { token } = useAuth();
  const { t } = useI18n();
  const { guides, refresh } = useContent();
  const allLabel = t("help.all");
  const [category, setCategory] = useState(allLabel);
  useEffect(() => {
    setCategory(allLabel);
  }, [allLabel]);
  const categories = useMemo(
    () => [allLabel, ...Array.from(new Set(guides.map((item) => item.category)))],
    [guides, allLabel]
  );
  const filtered = useMemo(
    () => (category === allLabel ? guides : guides.filter((item) => item.category === category)),
    [category, guides, allLabel]
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTop backLabel={t("nav.home")} onBack={() => navigation.navigate("Home")} />
        <Text style={styles.title}>{t("learn.title")}</Text>
        <Text style={styles.sub}>{t("learn.sub")}</Text>
        <AdminAddButton label={t("admin.addGuide")} onPress={() => navigation.navigate("EditGuide", {})} />
        <FilterChips items={categories} selected={category} onSelect={setCategory} />
        {filtered.map((item) => (
          <View key={item.id} style={styles.card}>
            <Pressable onPress={() => navigation.navigate("GuideDetail", { guideId: item.id })}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.category.toUpperCase()}</Text>
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>{item.summary}</Text>
            </Pressable>
            <AdminActions
              onEdit={() => navigation.navigate("EditGuide", { guideId: item.id })}
              onDelete={() =>
                confirmDelete(t("admin.deleteConfirm", { name: item.title }), async () => {
                  if (!token) return;
                  await deleteGuide(token, item.id);
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
  title: { fontSize: 34, fontWeight: "800", color: colors.navy },
  sub: { color: colors.muted, marginTop: 8, marginBottom: 16, lineHeight: 21 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.chipBorder,
    padding: 16,
    marginBottom: 12,
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "#EEE7E2",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 10,
  },
  tagText: { color: "#6B6560", fontWeight: "800", fontSize: 11, letterSpacing: 0.6 },
  cardTitle: { color: colors.navy, fontWeight: "800", fontSize: 18, marginBottom: 6 },
  cardBody: { color: colors.muted, lineHeight: 20 },
});
