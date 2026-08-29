import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  fetchContent,
  type AppContent,
  type EmergencyNumber,
  type Guide,
  type HelpService,
  type Incident,
} from "./api";
import { incidents as fallbackIncidents } from "./data/incidents";
import { helpServices as fallbackServices } from "./data/services";
import { emergencyNumbers as fallbackEmergencies } from "./data/emergencies";
import { guides as fallbackGuides } from "./data/guides";
import { useAuth } from "./auth";

type ContentContextValue = {
  incidents: Incident[];
  services: HelpService[];
  emergencies: EmergencyNumber[];
  guides: Guide[];
  loading: boolean;
  refresh: () => Promise<void>;
};

const ContentContext = createContext<ContentContextValue | undefined>(undefined);

const fallback: AppContent = {
  incidents: fallbackIncidents,
  services: fallbackServices,
  emergencies: fallbackEmergencies,
  guides: fallbackGuides,
};

export function ContentProvider({ children }: { children: ReactNode }) {
  const { token, refreshUser } = useAuth();
  const [content, setContent] = useState<AppContent>(fallback);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const next = await fetchContent();
      setContent(next);
    } catch {
      setContent(fallback);
    }
    try {
      if (token) {
        await refreshUser();
      }
    } catch {
      // Keep current session if profile refresh fails.
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, [token]);

  const value = useMemo(
    () => ({
      ...content,
      loading,
      refresh,
    }),
    [content, loading]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used inside ContentProvider");
  }
  return context;
}
