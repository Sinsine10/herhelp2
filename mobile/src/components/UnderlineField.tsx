import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";
import { colors } from "../theme";

export function UnderlineField({
  label,
  ...props
}: TextInputProps & { label: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#C5B8B2"
        style={styles.input}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 22,
  },
  label: {
    color: colors.label,
    fontSize: 11,
    letterSpacing: 1.4,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    paddingVertical: 8,
    fontSize: 16,
    color: colors.navy,
  },
});
