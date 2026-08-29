import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenTop } from "../src/components/Chrome";
import { AdminActions, AdminAddButton, confirmDelete } from "../src/components/AdminControls";
import { useAuth } from "../src/auth";
import { useContent } from "../src/content";
import { deleteIncident } from "../src/api";
import { colors } from "../src/theme";
import type { AppStackParamList } from "../src/types";

type Props = NativeStackScreenProps<AppStackParamList, "IncidentList">;

export default function IncidentListScreen({ navigation }: Props) {
  const { token } = useAuth();
  const { incidents, refresh } = useContent();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTop backLabel="HOME" onBack={() => navigation.navigate("Tabs", { screen: "Home" })} />
        <Text style={styles.title}>Something happened</Text>
        <Text style={styles.sub}>
          Pick what is closest to your situation. You will get step-by-step guidance — no forms, no
          reporting.
        </Text>
        <AdminAddButton label="+ Add incident" onPress={() => navigation.navigate("EditIncident", {})} />
        {incidents.map((item) => (
          <View key={item.id} style={styles.card}>
            <Pressable
              style={styles.row}
              onPress={() => navigation.navigate("IncidentDetail", { incidentId: item.id })}
            >
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardBody}>{item.summary}</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
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
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.chipBorder,
    padding: 16,
    marginBottom: 12,
  },
  row: { flexDirection: "row", alignItems: "center" },
  cardTitle: { color: colors.navy, fontWeight: "800", fontSize: 17, marginBottom: 4 },
  cardBody: { color: colors.muted, lineHeight: 20 },
  arrow: { color: colors.terracottaDark, fontSize: 20, fontWeight: "700" },
});
