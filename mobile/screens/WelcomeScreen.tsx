import { Pressable, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "../src/config";
import type { RootStackParamList } from "../src/types";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>HerHelp</Text>
      <Text style={styles.title}>You are not alone.</Text>
      <Text style={styles.body}>
        Find reliable information and support in Ethiopia when you experience abuse, violence,
        harassment, or another unsafe situation.
      </Text>
      <Pressable style={styles.primary} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.primaryText}>Create account</Text>
      </Pressable>
      <Pressable style={styles.secondary} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.secondaryText}>Sign in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 28,
    justifyContent: "center",
  },
  logo: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: colors.text,
  },
  body: {
    marginTop: 12,
    marginBottom: 36,
    color: colors.muted,
    lineHeight: 22,
    fontSize: 16,
  },
  primary: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  secondary: {
    marginTop: 12,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  secondaryText: {
    color: colors.primaryDark,
    fontWeight: "700",
    fontSize: 16,
  },
});
