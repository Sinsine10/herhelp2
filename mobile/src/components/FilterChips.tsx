import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { colors } from "../theme";

export function FilterChips<T extends string>({
  items,
  selected,
  onSelect,
}: {
  items: T[];
  selected: T;
  onSelect: (item: T) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator
      contentContainerStyle={styles.row}
      style={styles.scroll}
    >
      {items.map((item) => {
        const active = item === selected;
        return (
          <Pressable
            key={item}
            onPress={() => onSelect(item)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>{item}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginBottom: 16,
    flexGrow: 0,
  },
  row: {
    gap: 10,
    paddingRight: 12,
  },
  chip: {
    backgroundColor: colors.card,
    borderColor: colors.chipBorder,
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: colors.terracottaDark,
    borderColor: colors.terracottaDark,
  },
  text: {
    color: colors.navy,
    fontWeight: "600",
    fontSize: 14,
  },
  textActive: {
    color: colors.white,
  },
});
