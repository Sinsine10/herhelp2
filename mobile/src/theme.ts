export const colors = {
  background: "#F7F1EC",
  cream: "#FBF6F2",
  card: "#FFFFFF",
  terracotta: "#A35D43",
  terracottaDark: "#8B3A25",
  terracottaMid: "#B06A4E",
  terracottaSoft: "#C17A5E",
  navy: "#1C2434",
  muted: "#8A8490",
  label: "#9A8F8A",
  line: "#E4D4CB",
  white: "#FFFFFF",
  avatar: "#E9D4C4",
  avatarText: "#7A4A38",
  tabActive: "#F3E4DC",
  verifiedBg: "#DCEFE4",
  verifiedText: "#2F6B4F",
  hoursBg: "#F3E6D8",
  hoursText: "#6B5344",
  chipBorder: "#E5DCD6",
  helpIcon: "#D7E8E2",
  helpIconText: "#2F6B4F",
  learnIcon: "#F3D5D0",
  learnIconText: "#8B3A25",
  peachLabel: "#F3D9CC",
};

export function initials(fullName?: string | null) {
  if (!fullName?.trim()) {
    return "HH";
  }
  const parts = fullName.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function firstName(fullName?: string | null) {
  if (!fullName?.trim()) {
    return "there";
  }
  return fullName.trim().split(/\s+/)[0];
}

export function callNumber(phone: string) {
  const cleaned = phone.replace(/[^\d+]/g, "");
  return `tel:${cleaned}`;
}
