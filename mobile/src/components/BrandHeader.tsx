import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function BrandHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.logoCircle}>
        <Text style={styles.leaf}>❀</Text>
      </View>
      <Text style={styles.name}>HerHelp</Text>
      <Text style={styles.tagline}>
        Reliable information and verified support for women and girls in Ethiopia.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.terracotta,
    paddingHorizontal: 28,
    paddingTop: 18,
    paddingBottom: 56,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  leaf: {
    color: colors.white,
    fontSize: 22,
  },
  name: {
    color: colors.white,
    fontSize: 40,
    fontWeight: "800",
  },
  tagline: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    maxWidth: 320,
  },
});
