import type { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type TabParamList = {
  Home: undefined;
  FindHelp: undefined;
  Learn: undefined;
  Emergency: undefined;
};

export type AppStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  IncidentList: undefined;
  IncidentDetail: { incidentId: string };
  GuideDetail: { guideId: string };
  Settings: undefined;
  EditIncident: { incidentId?: string };
  EditService: { serviceId?: string };
  EditEmergency: { emergencyId?: string };
  EditGuide: { guideId?: string };
};
