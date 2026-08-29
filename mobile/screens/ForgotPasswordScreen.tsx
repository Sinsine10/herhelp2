import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BrandHeader } from "../src/components/BrandHeader";
import { colors } from "../src/theme";
import { useI18n } from "../src/i18n/LanguageContext";
import type { AuthStackParamList } from "../src/types";

type Props = NativeStackScreenProps<AuthStackParamList, "ForgotPassword">;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const { t } = useI18n();
  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.topSafe}>
        <BrandHeader />
      </SafeAreaView>
      <View style={styles.sheet}>
        <Text style={styles.title}>{t("forgot.title")}</Text>
        <Text style={styles.body}>{t("forgot.body")}</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>{t("forgot.back")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.terracotta,
  },
  topSafe: {
    backgroundColor: colors.terracotta,
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.card,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -28,
    paddingHorizontal: 28,
    paddingTop: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.navy,
    marginBottom: 12,
  },
  body: {
    color: colors.muted,
    lineHeight: 22,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.terracotta,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 28,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 18,
  },
});
