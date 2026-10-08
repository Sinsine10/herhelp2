import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { colors, initials } from "../theme";

import { useAuth } from "../auth";

import { useI18n } from "../i18n/LanguageContext";

export function Avatar() {
  const { user } = useAuth();

  const { t } = useI18n();

  const navigation = useNavigation();

  function openSettings() {
    const parent = navigation.getParent();

    if (parent) {
      parent.navigate("Settings" as never);
      return;
    }

    navigation.navigate("Settings" as never);
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.avatarButton,
        pressed && styles.avatarPressed,
      ]}
      onPress={openSettings}
      hitSlop={8}
    >
      {user?.role === "admin" ? (
        <Text style={styles.admin}>
          {t("nav.admin")}
        </Text>
      ) : null}

      <View style={styles.avatar}>
        <Text style={styles.initials}>
          {initials(user?.fullName)}
        </Text>
      </View>
    </Pressable>
  );
}

export function ScreenTop({
  backLabel,
  onBack,
}: {
  backLabel?: string;
  onBack?: () => void;
}) {
  return (
    <View style={styles.top}>
      {/* LEFT SIDE */}
      <View style={styles.leftSide}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            hitSlop={12}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backPressed,
            ]}
          >
            <View style={styles.backIconBox}>
              <Text style={styles.backIcon}>←</Text>
            </View>

            <Text style={styles.back}>
              {backLabel || "Back"}
            </Text>
          </Pressable>
        ) : (
          <View>
            <Text style={styles.logo}>
              HERHELP
            </Text>

            <Text style={styles.tagline}>
              Your safe space
            </Text>
          </View>
        )}
      </View>

      {/* RIGHT SIDE */}
      <Avatar />
    </View>
  );
}

const styles = StyleSheet.create({
  /* TOP HEADER */
  top: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    paddingTop: 4,
  },

  leftSide: {
    flex: 1,
    justifyContent: "center",
  },

  /* HERHELP LOGO */
  logo: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  tagline: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
    letterSpacing: 0.3,
  },

  /* BACK BUTTON */
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 32,
  },

  backIconBox: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },

  backIcon: {
    color: colors.navy,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "400",
    textAlign: "center",
  },

  back: {
    color: colors.navy,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    includeFontPadding: false,
  },

  backPressed: {
    opacity: 0.55,
  },

  /* AVATAR */
  avatarButton: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.avatar,
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 2,
    borderColor: colors.white,

    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  initials: {
    color: colors.avatarText,
    fontWeight: "800",
    fontSize: 13,
  },

  /* ADMIN LABEL */
  admin: {
    color: colors.terracottaDark,
    fontSize: 9,
    fontWeight: "900",
    marginBottom: 3,
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },

  avatarPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});