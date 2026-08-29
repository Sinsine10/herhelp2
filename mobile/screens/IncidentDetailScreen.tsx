import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenTop } from "../src/components/Chrome";
import { AdminActions, confirmDelete } from "../src/components/AdminControls";
import { useAuth } from "../src/auth";
import { useContent } from "../src/content";
import { deleteIncident } from "../src/api";
import { callNumber, colors } from "../src/theme";
import type { AppStackParamList } from "../src/types";

type Props = NativeStackScreenProps<AppStackParamList, "IncidentDetail">;

export default function IncidentDetailScreen({ navigation, route }: Props) {
  const { token } = useAuth();
  const { incidents, emergencies, refresh } = useContent();
  const incident = incidents.find((item) => item.id === route.params.incidentId);
  const police = emergencies.find((item) => item.name.toLowerCase().includes("police")) ?? emergencies[0];
  const policeNumber = police?.number ?? "991";

  if (!incident) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTop backLabel="ALL INCIDENT TYPES" onBack={() => navigation.navigate("IncidentList")} />
        <Text style={styles.title}>{incident.title}</Text>
        <Text style={styles.sub}>{incident.summary}</Text>
        <AdminActions
          onEdit={() => navigation.navigate("EditIncident", { incidentId: incident.id })}
          onDelete={() =>
            confirmDelete(`Delete ${incident.title}?`, async () => {
              if (!token) return;
              await deleteIncident(token, incident.id);
              await refresh();
              navigation.navigate("IncidentList");
            })
          }
        />

        <Pressable style={styles.call} onPress={() => Linking.openURL(callNumber(policeNumber))}>
          <Text style={styles.callText}>In danger right now? Call {policeNumber}</Text>
          <Text style={styles.callAction}>CALL</Text>
        </Pressable>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>ACTION PLAN</Text>
        </View>

        {incident.steps.map((step, index) => (
          <View key={`${step.title}-${index}`} style={styles.card}>
            <View style={styles.number}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepBody}>
                {step.body.includes("Find Help") ? (
                  <>
                    {step.body.split("Find Help")[0]}
                    <Text style={styles.link} onPress={() => navigation.navigate("Tabs", { screen: "FindHelp" })}>
                      Find Help
                    </Text>
                    {step.body.split("Find Help")[1]}
                  </>
                ) : (
                  step.body
                )}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  content: { paddingHorizontal: 20, paddingBottom: 36 },
  title: { fontSize: 32, fontWeight: "800", color: colors.navy },
  sub: { color: colors.muted, marginTop: 8, marginBottom: 12, lineHeight: 21 },
  call: {
    backgroundColor: colors.terracottaDark,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 18,
  },
  callText: { color: colors.white, fontWeight: "800", fontSize: 15, flex: 1, paddingRight: 8 },
  callAction: { color: colors.white, fontWeight: "800", letterSpacing: 0.8 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.peachLabel,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 14,
  },
  badgeText: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.chipBorder,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    gap: 12,
  },
  number: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.terracottaDark,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: { color: colors.white, fontWeight: "800" },
  stepTitle: { color: colors.navy, fontWeight: "800", fontSize: 16, marginBottom: 4 },
  stepBody: { color: colors.muted, lineHeight: 20 },
  link: { color: colors.terracottaDark, fontWeight: "800" },
});
