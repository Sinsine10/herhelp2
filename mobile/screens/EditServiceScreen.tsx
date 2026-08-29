import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { saveService } from "../src/api";
import { useAuth } from "../src/auth";
import { useContent } from "../src/content";
import { EditorScreen, Field, Toggle, useSaving } from "../src/components/Editor";
import type { AppStackParamList } from "../src/types";

type Props = NativeStackScreenProps<AppStackParamList, "EditService">;

export default function EditServiceScreen({ navigation, route }: Props) {
  const { token } = useAuth();
  const { services, refresh } = useContent();
  const existing = services.find((item) => item.id === route.params.serviceId);
  const { saving, setSaving, error, setError } = useSaving();
  const [name, setName] = useState(existing?.name ?? "");
  const [category, setCategory] = useState(existing?.category ?? "Clinic");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [area, setArea] = useState(existing?.area ?? "");
  const [hours, setHours] = useState(existing?.hours ?? "24 hours");
  const [phone, setPhone] = useState(existing?.phone ?? "");
  const [verified, setVerified] = useState(existing?.verified ?? true);

  async function onSave() {
    if (!token) return;
    setError("");
    setSaving(true);
    try {
      await saveService(token, { name, category, description, area, hours, phone, verified }, existing?.id);
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
      title={existing ? "Edit service" : "Add service"}
      onBack={() => navigation.goBack()}
      onSave={onSave}
      saving={saving}
      error={error}
    >
      <Field label="NAME" value={name} onChangeText={setName} />
      <Field label="CATEGORY" value={category} onChangeText={setCategory} />
      <Field label="DESCRIPTION" value={description} onChangeText={setDescription} multiline />
      <Field label="AREA" value={area} onChangeText={setArea} />
      <Field label="HOURS" value={hours} onChangeText={setHours} />
      <Field label="PHONE" value={phone} onChangeText={setPhone} />
      <Toggle label="Verified" value={verified} onToggle={() => setVerified((value) => !value)} />
    </EditorScreen>
  );
}
