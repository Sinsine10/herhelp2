import { StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "./src/theme";
import type { TabParamList } from "./src/types";

import HomeScreen from "./screens/HomeScreen";
import FindHelpScreen from "./screens/FindHelpScreen";
import LearnScreen from "./screens/LearnScreen";
import EmergencyScreen from "./screens/EmergencyScreen";

import { useI18n } from "./src/i18n/LanguageContext";

const Tab = createBottomTabNavigator<TabParamList>();

function TabLabel({
  label,
  focused,
}: {
  label: string;
  focused: boolean;
}) {
  return (
    <Text
      style={[styles.label, focused && styles.labelActive]}
      numberOfLines={1}
    >
      {label}
    </Text>
  );
}

export default function Tabs() {
  const { t } = useI18n();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;

            case "FindHelp":
              iconName = focused ? "search" : "search-outline";
              break;

            case "Learn":
              iconName = focused ? "book" : "book-outline";
              break;

            case "Emergency":
              iconName = focused
                ? "alert-circle"
                : "alert-circle-outline";
              break;

            default:
              iconName = "ellipse-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={22}
              color={
                focused
                  ? colors.terracotta
                  : colors.navy
              }
            />
          );
        },

        tabBarStyle: styles.bar,

        tabBarItemStyle: styles.item,

        tabBarActiveTintColor: colors.terracotta,

        tabBarInactiveTintColor: colors.navy,

        // Prevent the rectangle background
        tabBarActiveBackgroundColor: "transparent",

        tabBarShowLabel: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel
              label={t("tabs.home")}
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="FindHelp"
        component={FindHelpScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel
              label={t("tabs.findHelp")}
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel
              label={t("tabs.learn")}
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel
              label={t("tabs.emergency")}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 70,
    backgroundColor: colors.white,

    borderTopColor: colors.chipBorder,
    borderTopWidth: 1,

    paddingTop: 5,
    paddingBottom: 5,

    elevation: 0,
    shadowOpacity: 0,
  },

  item: {
    marginHorizontal: 0,
    marginVertical: 0,
    borderRadius: 0,
  },

  label: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.navy,
    textAlign: "center",
  },

  labelActive: {
    color: colors.terracotta,
    fontWeight: "800",
  },
});