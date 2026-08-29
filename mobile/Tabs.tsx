import { StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "./src/theme";
import type { TabParamList } from "./src/types";
import HomeScreen from "./screens/HomeScreen";
import FindHelpScreen from "./screens/FindHelpScreen";
import LearnScreen from "./screens/LearnScreen";
import EmergencyScreen from "./screens/EmergencyScreen";
import { useI18n } from "./src/i18n/LanguageContext";

const Tab = createBottomTabNavigator<TabParamList>();

function TabLabel({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={[styles.label, focused && styles.labelActive]} numberOfLines={1}>
      {label}
    </Text>
  );
}

export default function Tabs() {
  const { t } = useI18n();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarIcon: () => null,
        tabBarStyle: styles.bar,
        tabBarItemStyle: styles.item,
        tabBarActiveBackgroundColor: colors.tabActive,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label={t("tabs.home")} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="FindHelp"
        component={FindHelpScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label={t("tabs.findHelp")} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label={t("tabs.learn")} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label={t("tabs.emergency")} focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 64,
    backgroundColor: colors.white,
    borderTopColor: colors.chipBorder,
    paddingTop: 8,
    paddingBottom: 8,
  },
  item: {
    borderRadius: 18,
    marginHorizontal: 6,
    marginVertical: 6,
  },
  label: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0,
    color: colors.navy,
    textAlign: "center",
  },
  labelActive: {
    color: colors.navy,
  },
});
