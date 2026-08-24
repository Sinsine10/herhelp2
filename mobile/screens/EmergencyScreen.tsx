import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenTop } from "../src/components/Chrome";
import { emergencyNumbers } from "../src/data/emergencies";
import { callNumber, colors } from "../src/theme";
import type { AppStackParamList, TabParamList } from "../src/types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Emergency">,
  NativeStackScreenProps<AppStackParamList>
>;

export default function EmergencyScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTop backLabel="HOME" onBack={() => navigation.navigate("Home")} />
        <Text style={styles.title}>Emergency numbers</Text>
        <Text style={styles.sub}>
          Tap a number to call. If you cannot speak, keep the line open and move to a safe place.
        </Text>
        {emergencyNumbers.map((item) => (
          <Pressable
            key={item.id}
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
  card: {
    backgroundColor: colors.terracottaDark,
    borderRadius: 22,
    padding: 18,
    marginBottom: 12,
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
