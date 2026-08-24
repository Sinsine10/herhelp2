import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenTop } from "../src/components/Chrome";
import { FilterChips } from "../src/components/FilterChips";
import { guideCategories, guides, type GuideCategory } from "../src/data/guides";
import { colors } from "../src/theme";
import type { AppStackParamList, TabParamList } from "../src/types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Learn">,
  NativeStackScreenProps<AppStackParamList>
>;

export default function LearnScreen({ navigation }: Props) {
  const [category, setCategory] = useState<GuideCategory>("All");
  const filtered = useMemo(
    () => (category === "All" ? guides : guides.filter((item) => item.category === category)),
    [category]
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTop backLabel="HOME" onBack={() => navigation.navigate("Home")} />
        <Text style={styles.title}>Learn</Text>
        <Text style={styles.sub}>Short, plain-language guides. Read at your own pace.</Text>
        <FilterChips items={guideCategories} selected={category} onSelect={setCategory} />
        {filtered.map((item) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate("GuideDetail", { guideId: item.id })}
          >
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item.category.toUpperCase()}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardBody}>{item.summary}</Text>
          </Pressable>
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
