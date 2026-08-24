import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenTop } from "../src/components/Chrome";
import { getGuide } from "../src/data/guides";
import { colors } from "../src/theme";
import type { AppStackParamList } from "../src/types";

type Props = NativeStackScreenProps<AppStackParamList, "GuideDetail">;

export default function GuideDetailScreen({ navigation, route }: Props) {
  const guide = getGuide(route.params.guideId);

  if (!guide) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTop backLabel="ALL GUIDES" onBack={() => navigation.navigate("Tabs", { screen: "Learn" })} />
        <Text style={styles.title}>{guide.title}</Text>
        <Text style={styles.sub}>{guide.summary}</Text>
        <View style={styles.card}>
          <Text style={styles.body}>{guide.intro}</Text>
          {guide.heading ? <Text style={styles.heading}>{guide.heading}</Text> : null}
          {guide.bullets.map((bullet) => (
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
  sub: { color: colors.muted, marginTop: 10, marginBottom: 18, lineHeight: 21 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.chipBorder,
    padding: 20,
  },
  body: { color: "#4A5563", fontSize: 16, lineHeight: 24 },
  heading: { color: colors.navy, fontWeight: "800", marginTop: 18, marginBottom: 10, fontSize: 16 },
  bullet: { color: "#4A5563", fontSize: 16, lineHeight: 24, marginBottom: 10 },
  footer: { marginTop: 12 },
});
