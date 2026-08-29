import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenTop } from "../src/components/Chrome";
import { AdminActions, AdminAddButton, confirmDelete } from "../src/components/AdminControls";
import { useAuth } from "../src/auth";
import { useContent } from "../src/content";
import { deleteIncident } from "../src/api";
import { callNumber, colors, firstName } from "../src/theme";
import type { AppStackParamList, TabParamList } from "../src/types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Home">,
  NativeStackScreenProps<AppStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const { user, token } = useAuth();
  const { incidents, emergencies, refresh } = useContent();
  const featured = incidents.filter((item) => item.featured).slice(0, 4);
  const police = emergencies.find((item) => item.name.toLowerCase().includes("police")) ?? emergencies[0];
  const policeNumber = police?.number ?? "991";

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTop />
        <Text style={styles.kicker}>WELCOME TO HERHELP</Text>
        <Text style={styles.hello}>You are safe here, {firstName(user?.fullName)}.</Text>
        <Text style={styles.sub}>
          Choose what you need right now. Nothing you tap is shared with anyone.
        </Text>

        <Pressable style={styles.danger} onPress={() => Linking.openURL(callNumber(policeNumber))}>
          <View style={{ flex: 1 }}>
            <Text style={styles.dangerKicker}>IMMEDIATE DANGER?</Text>
            <Text style={styles.dangerTitle}>Call {police?.name ?? "Police"} {policeNumber}</Text>
          </View>
          <View style={styles.bang}>
            <Text style={styles.bangText}>!</Text>
          </View>
        </Pressable>

        <View style={styles.happened}>
          <Text style={styles.happenedTitle}>Something happened</Text>
          <Text style={styles.happenedSub}>I need immediate guidance on what to do next.</Text>
          <AdminAddButton label="+ Add incident" onPress={() => navigation.navigate("EditIncident", {})} />
          <View style={styles.grid}>
            {featured.map((item) => (
              <View key={item.id} style={styles.gridWrap}>
                <Pressable
                  style={styles.gridItem}
                  onPress={() => navigation.navigate("IncidentDetail", { incidentId: item.id })}
                >
                  <Text style={styles.gridText}>{item.title}</Text>
                </Pressable>
                <AdminActions
                  onEdit={() => navigation.navigate("EditIncident", { incidentId: item.id })}
                  onDelete={() =>
                    confirmDelete(`Delete ${item.title}?`, async () => {
                      if (!token) return;
                      await deleteIncident(token, item.id);
                      await refresh();
                    })
                  }
                />
              </View>
            ))}
          </View>
          <Pressable onPress={() => navigation.navigate("IncidentList")}>
            <Text style={styles.seeAll}>See all incident types</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable style={styles.mini} onPress={() => navigation.navigate("FindHelp")}>
            <View style={[styles.letter, { backgroundColor: colors.helpIcon }]}>
              <Text style={[styles.letterText, { color: colors.helpIconText }]}>H</Text>
            </View>
            <Text style={styles.miniTitle}>Find Help</Text>
            <Text style={styles.miniSub}>Hospitals, shelters, legal aid</Text>
          </Pressable>
          <Pressable style={styles.mini} onPress={() => navigation.navigate("Learn")}>
            <View style={[styles.letter, { backgroundColor: colors.learnIcon }]}>
              <Text style={[styles.letterText, { color: colors.learnIconText }]}>L</Text>
            </View>
            <Text style={styles.miniTitle}>Learn</Text>
            <Text style={styles.miniSub}>Your rights and safety guides</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  kicker: {
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 1.2,
    fontWeight: "700",
  },
  hello: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.navy,
    marginTop: 6,
    lineHeight: 36,
  },
  sub: {
    color: colors.muted,
    marginTop: 8,
    marginBottom: 18,
    lineHeight: 20,
  },
  danger: {
    backgroundColor: colors.terracottaDark,
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dangerKicker: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  dangerTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 4,
  },
  bang: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  bangText: {
    color: colors.terracottaDark,
    fontWeight: "800",
    fontSize: 22,
  },
  happened: {
    backgroundColor: colors.terracottaMid,
    borderRadius: 26,
    padding: 18,
    marginBottom: 16,
  },
  happenedTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "800",
  },
  happenedSub: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
    marginBottom: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  gridWrap: {
    width: "48%",
    flexGrow: 1,
  },
  gridItem: {
    backgroundColor: "rgba(92, 32, 18, 0.28)",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 12,
    minHeight: 72,
    justifyContent: "center",
  },
  gridText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 15,
  },
  seeAll: {
    color: colors.white,
    marginTop: 16,
    textDecorationLine: "underline",
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  mini: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
  },
  letter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  letterText: {
    fontWeight: "800",
  },
  miniTitle: {
    color: colors.navy,
    fontWeight: "800",
    fontSize: 16,
  },
  miniSub: {
    color: colors.muted,
    marginTop: 4,
    fontSize: 13,
  },
});
