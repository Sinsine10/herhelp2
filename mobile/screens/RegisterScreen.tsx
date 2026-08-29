import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BrandHeader } from "../src/components/BrandHeader";
import { UnderlineField } from "../src/components/UnderlineField";
import { registerAccount } from "../src/api";
import { useAuth } from "../src/auth";
import { useI18n } from "../src/i18n/LanguageContext";
import { LanguagePicker } from "../src/i18n/LanguagePicker";
import { colors } from "../src/theme";
import type { AuthStackParamList } from "../src/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const { setSession } = useAuth();
  const { t } = useI18n();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setError("");
    setLoading(true);
    try {
      const result = await registerAccount({ fullName, email, phone, password });
      await setSession(result.token, result.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("register.fail"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.topSafe}>
        <BrandHeader />
      </SafeAreaView>
      <KeyboardAvoidingView
        style={styles.sheetWrap}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.sheet}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>{t("register.title")}</Text>
            <Text style={styles.subtitle}>{t("register.sub")}</Text>
            <LanguagePicker />
            <UnderlineField
              label={t("register.name")}
              placeholder={t("register.namePh")}
              value={fullName}
              onChangeText={setFullName}
            />
            <UnderlineField
              label={t("login.email")}
              placeholder="you@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <UnderlineField
              label={t("register.phone")}
              placeholder="09xxxxxxxx"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <UnderlineField
              label={t("login.password")}
              placeholder={t("register.passwordPh")}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Pressable style={styles.button} onPress={onSubmit} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? t("register.creating") : t("register.submit")}</Text>
            </Pressable>
            <Text style={styles.footer}>
              {t("register.have")}{" "}
              <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
                {t("register.login")}
              </Text>
            </Text>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
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
  sheetWrap: {
    flex: 1,
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
  },
  subtitle: {
    color: colors.muted,
    marginTop: 6,
    marginBottom: 22,
    lineHeight: 20,
  },
  button: {
    backgroundColor: colors.terracotta,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 18,
  },
  footer: {
    textAlign: "center",
    marginTop: 28,
    marginBottom: 24,
    color: colors.muted,
    fontSize: 16,
  },
  link: {
    color: colors.terracotta,
    fontWeight: "800",
  },
  error: {
    color: "#B42318",
    marginBottom: 10,
  },
});
