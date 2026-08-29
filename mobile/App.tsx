import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "./src/auth";
import { colors } from "./src/theme";
import type { AppStackParamList, AuthStackParamList } from "./src/types";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import IncidentListScreen from "./screens/IncidentListScreen";
import IncidentDetailScreen from "./screens/IncidentDetailScreen";
import GuideDetailScreen from "./screens/GuideDetailScreen";
import SettingsScreen from "./screens/SettingsScreen";
import EditIncidentScreen from "./screens/EditIncidentScreen";
import EditServiceScreen from "./screens/EditServiceScreen";
import EditEmergencyScreen from "./screens/EditEmergencyScreen";
import EditGuideScreen from "./screens/EditGuideScreen";
import Tabs from "./Tabs";
import { ContentProvider } from "./src/content";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
}

function MainNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Tabs" component={Tabs} />
      <AppStack.Screen name="IncidentList" component={IncidentListScreen} />
      <AppStack.Screen name="IncidentDetail" component={IncidentDetailScreen} />
      <AppStack.Screen name="GuideDetail" component={GuideDetailScreen} />
      <AppStack.Screen name="Settings" component={SettingsScreen} />
      <AppStack.Screen name="EditIncident" component={EditIncidentScreen} />
      <AppStack.Screen name="EditService" component={EditServiceScreen} />
      <AppStack.Screen name="EditEmergency" component={EditEmergencyScreen} />
      <AppStack.Screen name="EditGuide" component={EditGuideScreen} />
    </AppStack.Navigator>
  );
}

function RootNavigator() {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.cream,
        }}
      >
        <ActivityIndicator color={colors.terracotta} />
      </View>
    );
  }

  return user ? <MainNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ContentProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <RootNavigator />
          </NavigationContainer>
        </ContentProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
