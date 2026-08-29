import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { saveEmergency } from "../src/api";
import { useAuth } from "../src/auth";
import { useContent } from "../src/content";
import { EditorScreen, Field, useSaving } from "../src/components/Editor";
import type { AppStackParamList } from "../src/types";

type Props = NativeStackScreenProps<AppStackParamList, "EditEmergency">;

export default function EditEmergencyScreen({ navigation, route }: Props) {
  const { token } = useAuth();
  const { emergencies, refresh } = useContent();
  const existing = emergencies.find((item) => item.id === route.params.emergencyId);
  const { saving, setSaving, error, setError } = useSaving();
  const [name, setName] = useState(existing?.name ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [number, setNumber] = useState(existing?.number ?? "");

  async function onSave() {
    if (!token) return;
    setError("");
    setSaving(true);
    try {
      await saveEmergency(token, { name, description, number }, existing?.id);
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
      title={existing ? "Edit emergency number" : "Add emergency number"}
      onBack={() => navigation.goBack()}
      onSave={onSave}
      saving={saving}
      error={error}
    >
      <Field label="NAME" value={name} onChangeText={setName} />
      <Field label="DESCRIPTION" value={description} onChangeText={setDescription} multiline />
      <Field label="NUMBER" value={number} onChangeText={setNumber} />
    </EditorScreen>
  );
}
