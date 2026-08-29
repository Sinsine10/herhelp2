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
import { loginAccount } from "../src/api";
import { useAuth } from "../src/auth";
import { useI18n } from "../src/i18n/LanguageContext";
import { LanguagePicker } from "../src/i18n/LanguagePicker";
import { colors } from "../src/theme";
import type { AuthStackParamList } from "../src/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { setSession } = useAuth();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setError("");
    setLoading(true);
    try {
      const result = await loginAccount({ email, password });
      await setSession(result.token, result.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("login.fail"));
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
            <Text style={styles.title}>{t("login.title")}</Text>
            <LanguagePicker />
            <UnderlineField
              label={t("login.email")}
              placeholder="you@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <UnderlineField
              label={t("login.password")}
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Pressable style={styles.button} onPress={onSubmit} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? t("login.wait") : t("login.submit")}</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.forgot}>{t("login.forgot")}</Text>
            </Pressable>
            <Text style={styles.footer}>
              {t("login.new")}{" "}
              <Text style={styles.register} onPress={() => navigation.navigate("Register")}>
                {t("login.register")}
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
    marginBottom: 28,
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
  forgot: {
    textAlign: "center",
    marginTop: 22,
    color: colors.navy,
    fontSize: 16,
  },
  footer: {
    textAlign: "center",
    marginTop: 28,
    marginBottom: 24,
    color: colors.muted,
    fontSize: 16,
  },
  register: {
    color: colors.terracotta,
    fontWeight: "800",
  },
  error: {
    color: "#B42318",
    marginBottom: 10,
  },
});
