import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { saveIncident, type ActionStep } from "../src/api";
import { useAuth } from "../src/auth";
import { useContent } from "../src/content";
import { EditorScreen, Field, Toggle, useSaving } from "../src/components/Editor";
import { colors } from "../src/theme";
import type { AppStackParamList } from "../src/types";

type Props = NativeStackScreenProps<AppStackParamList, "EditIncident">;

export default function EditIncidentScreen({ navigation, route }: Props) {
  const { token } = useAuth();
  const { incidents, refresh } = useContent();
  const existing = incidents.find((item) => item.id === route.params.incidentId);
  const { saving, setSaving, error, setError } = useSaving();
  const [title, setTitle] = useState(existing?.title ?? "");
  const [summary, setSummary] = useState(existing?.summary ?? "");
  const [featured, setFeatured] = useState(Boolean(existing?.featured));
  const [steps, setSteps] = useState<ActionStep[]>(existing?.steps ?? [{ title: "", body: "" }]);

  async function onSave() {
    if (!token) return;
    setError("");
    setSaving(true);
    try {
      await saveIncident(
        token,
        { title, summary, featured, steps: steps.filter((step) => step.title && step.body) },
        existing?.id
      );
      await refresh();
      navigation.goBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <EditorScreen
      title={existing ? "Edit incident" : "Add incident"}
      onBack={() => navigation.goBack()}
      onSave={onSave}
      saving={saving}
      error={error}
    >
      <Field label="TITLE" value={title} onChangeText={setTitle} />
      <Field label="SUMMARY" value={summary} onChangeText={setSummary} multiline />
      <Toggle label="Show on home page" value={featured} onToggle={() => setFeatured((value) => !value)} />
      {steps.map((step, index) => (
        <View key={index} style={styles.step}>
          <Text style={styles.stepLabel}>STEP {index + 1}</Text>
          <Field
            label="STEP TITLE"
            value={step.title}
            onChangeText={(text) =>
              setSteps((current) => current.map((item, i) => (i === index ? { ...item, title: text } : item)))
            }
          />
          <Field
            label="STEP DETAILS"
            value={step.body}
            onChangeText={(text) =>
              setSteps((current) => current.map((item, i) => (i === index ? { ...item, body: text } : item)))
            }
            multiline
          />
          {steps.length > 1 ? (
            <Pressable onPress={() => setSteps((current) => current.filter((_, i) => i !== index))}>
              <Text style={styles.remove}>Remove step</Text>
            </Pressable>
          ) : null}
        </View>
      ))}
      <Pressable onPress={() => setSteps((current) => [...current, { title: "", body: "" }])}>
        <Text style={styles.add}>+ Add step</Text>
      </Pressable>
    </EditorScreen>
  );
}

const styles = StyleSheet.create({
  step: { marginBottom: 8 },
  stepLabel: { color: colors.terracotta, fontWeight: "800", marginBottom: 8 },
  remove: { color: "#9B1C1C", fontWeight: "700", marginBottom: 12 },
  add: { color: colors.terracottaDark, fontWeight: "800", marginBottom: 16 },
});
