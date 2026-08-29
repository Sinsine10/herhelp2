import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";
import { LOCALES, localeNames, useI18n } from "./LanguageContext";

export function LanguagePicker() {
  const { lang, setLang } = useI18n();

  return (
    <View style={styles.wrap}>
      {LOCALES.map((code) => {
        const active = code === lang;
        return (
          <Pressable
            key={code}
            onPress={() => setLang(code)}
            style={[styles.chip, active && styles.chipOn]}
          >
            <Text style={[styles.text, active && styles.textOn]}>{localeNames[code].native}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  chip: {
    borderWidth: 1,
    borderColor: colors.chipBorder,
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipOn: { backgroundColor: colors.terracottaDark, borderColor: colors.terracottaDark },
  text: { color: colors.navy, fontWeight: "700", fontSize: 13 },
  textOn: { color: colors.white },
});
