export const colors = {
  background: "#FBF6F4",
  card: "#FFFFFF",
  primary: "#8B3A4A",
  primaryDark: "#5C2431",
  text: "#2B1A1F",
  muted: "#7A5C65",
  border: "#E8D7DB",
  danger: "#B42318",
  success: "#2F6B4F",
};

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:3000";
