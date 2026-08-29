import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { saveGuide } from "../src/api";
import { useAuth } from "../src/auth";
import { useContent } from "../src/content";
import { EditorScreen, Field, useSaving } from "../src/components/Editor";
import type { AppStackParamList } from "../src/types";

type Props = NativeStackScreenProps<AppStackParamList, "EditGuide">;

export default function EditGuideScreen({ navigation, route }: Props) {
  const { token } = useAuth();
  const { guides, refresh } = useContent();
  const existing = guides.find((item) => item.id === route.params.guideId);
  const { saving, setSaving, error, setError } = useSaving();
  const [category, setCategory] = useState(existing?.category ?? "Women's rights");
  const [title, setTitle] = useState(existing?.title ?? "");
  const [summary, setSummary] = useState(existing?.summary ?? "");
  const [intro, setIntro] = useState(existing?.intro ?? "");
  const [heading, setHeading] = useState(existing?.heading ?? "");
  const [bullets, setBullets] = useState((existing?.bullets ?? []).join("\n"));
  const [footer, setFooter] = useState(existing?.footer ?? "");

  async function onSave() {
    if (!token) return;
    setError("");
    setSaving(true);
    try {
      await saveGuide(
        token,
        {
          category,
          title,
          summary,
          intro,
          heading,
          footer,
          bullets: bullets
            .split("\n")
            .map((line) => line.replace(/^-\s*/, "").trim())
            .filter(Boolean),
        },
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
      title={existing ? "Edit guide" : "Add guide"}
      onBack={() => navigation.goBack()}
      onSave={onSave}
      saving={saving}
      error={error}
    >
      <Field label="CATEGORY" value={category} onChangeText={setCategory} />
      <Field label="TITLE" value={title} onChangeText={setTitle} />
      <Field label="SUMMARY" value={summary} onChangeText={setSummary} multiline />
      <Field label="INTRO" value={intro} onChangeText={setIntro} multiline />
      <Field label="HEADING" value={heading} onChangeText={setHeading} />
      <Field label="BULLETS (one per line)" value={bullets} onChangeText={setBullets} multiline />
      <Field label="FOOTER" value={footer} onChangeText={setFooter} multiline />
    </EditorScreen>
  );
}
