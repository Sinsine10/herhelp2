import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, initials } from "../theme";
import { useAuth } from "../auth";

export function Avatar() {
  const { user } = useAuth();
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
    <Pressable style={styles.avatar} onPress={openSettings}>
      <Text style={styles.initials}>{initials(user?.fullName)}</Text>
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
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={12}>
          <Text style={styles.back}>← {backLabel}</Text>
        </Pressable>
      ) : (
        <View />
      )}
      <Avatar />
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  back: {
    color: colors.navy,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.avatar,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: colors.avatarText,
    fontWeight: "700",
    fontSize: 13,
  },
});
