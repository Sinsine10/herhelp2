import {
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import type { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ScreenTop } from "../src/components/Chrome";

import {
  AdminActions,
  AdminAddButton,
  confirmDelete,
} from "../src/components/AdminControls";

import { useAuth } from "../src/auth";
import { useContent } from "../src/content";
import { deleteIncident } from "../src/api";
import { callNumber, colors, firstName } from "../src/theme";
import { useI18n } from "../src/i18n/LanguageContext";

import type { AppStackParamList, TabParamList } from "../src/types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Home">,
  NativeStackScreenProps<AppStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const { user, token } = useAuth();
  const { t } = useI18n();

  const { incidents, emergencies, refresh } = useContent();

  const featured = incidents
    .filter((item) => item.featured)
    .slice(0, 4);

  const police =
    emergencies.find((item) => item.number === "991") ??
    emergencies[0];

  const policeNumber = police?.number ?? "991";

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <ScreenTop />

        <Text style={styles.kicker}>
          {t("home.kicker")}
        </Text>

        <Text style={styles.hello}>
          {t("home.hello", {
            name: firstName(user?.fullName),
          })}
        </Text>

        <Text style={styles.sub}>
          {t("home.sub")}
        </Text>

        {/* EMERGENCY CARD */}
        <Pressable
          style={({ pressed }) => [
            styles.danger,
            pressed && styles.pressed,
          ]}
          onPress={() =>
            Linking.openURL(callNumber(policeNumber))
          }
        >
          <View style={styles.dangerContent}>
            <Text style={styles.dangerKicker}>
              {t("home.danger")}
            </Text>

            <Text style={styles.dangerTitle}>
              {t("home.call", {
                name: police?.name ?? "Police",
                number: policeNumber,
              })}
            </Text>

            <Text style={styles.dangerSub}>
              Tap to call immediately
            </Text>
          </View>

          <View style={styles.bang}>
            <Text style={styles.bangText}>!</Text>
          </View>
        </Pressable>

        {/* SOMETHING HAPPENED */}
        <ImageBackground
          source={require("../assets/something-happened.jpg")}
          style={styles.happened}
          imageStyle={styles.happenedImage}
          resizeMode="cover"
        >
          <View style={styles.happenedOverlay}>
            <Text style={styles.happenedTitle}>
              {t("home.happened")}
            </Text>

            <Text style={styles.happenedSub}>
              {t("home.happenedSub")}
            </Text>

            <AdminAddButton
              label={t("admin.addIncident")}
              onPress={() =>
                navigation.navigate("EditIncident", {})
              }
            />

            <View style={styles.grid}>
              {featured.map((item) => (
                <View
                  key={item.id}
                  style={styles.gridWrap}
                >
                  <Pressable
                    style={({ pressed }) => [
                      styles.gridItem,
                      pressed && styles.gridItemPressed,
                    ]}
                    onPress={() =>
                      navigation.navigate(
                        "IncidentDetail",
                        {
                          incidentId: item.id,
                        }
                      )
                    }
                  >
                    <Text style={styles.gridText}>
                      {item.title}
                    </Text>
                  </Pressable>

                  <AdminActions
                    onEdit={() =>
                      navigation.navigate(
                        "EditIncident",
                        {
                          incidentId: item.id,
                        }
                      )
                    }
                    onDelete={() =>
                      confirmDelete(
                        t("admin.deleteConfirm", {
                          name: item.title,
                        }),
                        async () => {
                          if (!token) return;

                          await deleteIncident(
                            token,
                            item.id
                          );

                          await refresh();
                        }
                      )
                    }
                  />
                </View>
              ))}
            </View>

            <Pressable
              onPress={() =>
                navigation.navigate("IncidentList")
              }
            >
              <Text style={styles.seeAll}>
                {t("home.seeAll")}
              </Text>
            </Pressable>
          </View>
        </ImageBackground>

        {/* FIND HELP + LEARN */}
        <View style={styles.row}>
          {/* FIND HELP */}
          <Pressable
            style={({ pressed }) => [
              styles.imageCard,
              pressed && styles.pressedCard,
            ]}
            onPress={() =>
              navigation.navigate("FindHelp")
            }
          >
            <ImageBackground
              source={require("../assets/find-help.jpg")}
              style={styles.cardImage}
              imageStyle={styles.cardImageRadius}
              resizeMode="cover"
            >
              <View style={styles.cardOverlay}>
                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>
                    H
                  </Text>
                </View>

                <Text style={styles.cardTitle}>
                  {t("home.findHelp")}
                </Text>

                <Text style={styles.cardSub}>
                  {t("home.findHelpSub")}
                </Text>
              </View>
            </ImageBackground>
          </Pressable>

          {/* LEARN */}
          <Pressable
            style={({ pressed }) => [
              styles.imageCard,
              pressed && styles.pressedCard,
            ]}
            onPress={() =>
              navigation.navigate("Learn")
            }
          >
            <ImageBackground
              source={require("../assets/learn.jpg")}
              style={styles.cardImage}
              imageStyle={styles.cardImageRadius}
              resizeMode="cover"
            >
              <View style={styles.cardOverlay}>
                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>
                    L
                  </Text>
                </View>

                <Text style={styles.cardTitle}>
                  {t("home.learn")}
                </Text>

                <Text style={styles.cardSub}>
                  {t("home.learnSub")}
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* PAGE */
  safe: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },

  /* HEADER */
  kicker: {
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 1.2,
    fontWeight: "700",
  },

  hello: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.navy,
    marginTop: 6,
    lineHeight: 36,
  },

  sub: {
    color: colors.muted,
    marginTop: 8,
    marginBottom: 18,
    lineHeight: 20,
  },

  /* EMERGENCY */
  danger: {
    backgroundColor: colors.terracottaDark,
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,

    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 4,
  },

  dangerContent: {
    flex: 1,
  },

  dangerKicker: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  dangerTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 4,
  },

  dangerSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    marginTop: 5,
  },

  bang: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },

  bangText: {
    color: colors.terracottaDark,
    fontWeight: "900",
    fontSize: 24,
  },

  /* SOMETHING HAPPENED */
  happened: {
    width: "100%",
    height: 320,
    borderRadius: 26,
    overflow: "hidden",
    marginBottom: 16,
  },

  happenedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 26,
  },

  happenedOverlay: {
    flex: 1,
    padding: 18,
    backgroundColor: "rgba(60, 25, 15, 0.62)",
  },

  happenedTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "800",
  },

  happenedSub: {
    color: "rgba(255,255,255,0.95)",
    marginTop: 4,
    marginBottom: 14,
    lineHeight: 20,
  },

  /* INCIDENT GRID */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  gridWrap: {
    width: "48%",
    flexGrow: 1,
  },

  gridItem: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.30)",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 12,
    minHeight: 72,
    justifyContent: "center",
  },

  gridItemPressed: {
    backgroundColor: "rgba(255,255,255,0.30)",
  },

  gridText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 15,
  },

  seeAll: {
    color: colors.white,
    marginTop: 16,
    textDecorationLine: "underline",
    fontWeight: "700",
  },

  /* FIND HELP + LEARN */
  row: {
    flexDirection: "row",
    gap: 12,
  },

  imageCard: {
    flex: 1,
    height: 190,
    borderRadius: 20,
    overflow: "hidden",
  },

  cardImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },

  cardImageRadius: {
    borderRadius: 20,
  },

  cardOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.30)",
  },

  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },

  cardIconText: {
    color: colors.navy,
    fontWeight: "900",
    fontSize: 17,
  },

  cardTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "800",
  },

  cardSub: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 12,
    marginTop: 4,
    lineHeight: 17,
  },

  /* PRESS EFFECT */
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },

  pressedCard: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },

  /* BOTTOM SPACE */
  bottomSpace: {
    height: 20,
  },
});