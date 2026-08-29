import { useEffect, useMemo, useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenTop } from "../src/components/Chrome";
import { FilterChips } from "../src/components/FilterChips";
import { AdminActions, AdminAddButton, confirmDelete } from "../src/components/AdminControls";
import { useAuth } from "../src/auth";
import { useContent } from "../src/content";
import { deleteService } from "../src/api";
import { callNumber, colors } from "../src/theme";
import { useI18n } from "../src/i18n/LanguageContext";
import type { AppStackParamList, TabParamList } from "../src/types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "FindHelp">,
  NativeStackScreenProps<AppStackParamList>
>;

export default function FindHelpScreen({ navigation }: Props) {
  const { token } = useAuth();
  const { t } = useI18n();
  const { services, refresh } = useContent();
  const [query, setQuery] = useState("");
  const allLabel = t("help.all");
  const [category, setCategory] = useState(allLabel);
  useEffect(() => {
    setCategory(allLabel);
  }, [allLabel]);
  const categories = useMemo(
    () => [allLabel, ...Array.from(new Set(services.map((item) => item.category)))],
    [services, allLabel]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((item) => {
      const matchesCategory = category === allLabel || item.category === category;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.area.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category, services, allLabel]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTop backLabel={t("nav.home")} onBack={() => navigation.navigate("Home")} />
        <Text style={styles.title}>{t("help.title")}</Text>
        <Text style={styles.sub}>{t("help.sub")}</Text>
        <AdminAddButton label={t("admin.addService")} onPress={() => navigation.navigate("EditService", {})} />
        <TextInput
          style={styles.search}
          placeholder={t("help.search")}
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={setQuery}
        />
        <FilterChips items={categories} selected={category} onSelect={setCategory} />
        {filtered.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.head}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.badges}>
                {item.verified ? (
                  <View style={styles.verified}>
                    <Text style={styles.verifiedText}>{t("help.verified")}</Text>
                  </View>
                ) : null}
                <View style={styles.hours}>
                  <Text style={styles.hoursText}>{item.hours}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.cat}>{item.category}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.area}>{item.area}</Text>
            <Pressable style={styles.call} onPress={() => Linking.openURL(callNumber(item.phone))}>
              <Text style={styles.callText}>{t("help.call", { phone: item.phone })}</Text>
            </Pressable>
            <AdminActions
              onEdit={() => navigation.navigate("EditService", { serviceId: item.id })}
              onDelete={() =>
                confirmDelete(t("admin.deleteConfirm", { name: item.name }), async () => {
                  if (!token) return;
                  await deleteService(token, item.id);
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
  search: {
    backgroundColor: colors.card,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.chipBorder,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.navy,
    marginBottom: 14,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  head: { gap: 8 },
  name: { color: colors.navy, fontWeight: "800", fontSize: 17, lineHeight: 23 },
  badges: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  verified: {
    backgroundColor: colors.verifiedBg,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  verifiedText: { color: colors.verifiedText, fontWeight: "800", fontSize: 11 },
  hours: {
    backgroundColor: colors.hoursBg,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  hoursText: { color: colors.hoursText, fontWeight: "700", fontSize: 12 },
  cat: { color: colors.muted, marginTop: 10, fontSize: 13 },
  desc: { color: colors.navy, marginTop: 6, lineHeight: 20 },
  area: { color: colors.muted, marginTop: 8, marginBottom: 14 },
  call: {
    backgroundColor: colors.terracottaDark,
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: "center",
  },
  callText: { color: colors.white, fontWeight: "800", fontSize: 16 },
});
