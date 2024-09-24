// TrackContext.tsx
import { Track } from "@/lib/types"; // Ajustez le chemin si nécessaire
import React, { createContext, useContext, useState } from "react";

// Définissez la forme de votre contexte
interface TrackContextType {
  hoveredTrack: Track | null;
  selectedTrack: Track | null;
  setHoveredTrack: (track: Track | null) => void;
  setSelectedTrack: (track: Track | null) => void;
}

// Créez le contexte
const TrackContext = createContext<TrackContextType | undefined>(undefined);

// Créez un fournisseur pour le contexte
export const TrackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hoveredTrack, setHoveredTrack] = useState<Track | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  return (
    <TrackContext.Provider
      value={{ hoveredTrack, selectedTrack, setHoveredTrack, setSelectedTrack }}
    >
      {children}
    </TrackContext.Provider>
  );
};

// Créez un hook personnalisé pour utiliser le contexte
export const useTrackContext = () => {
  const context = useContext(TrackContext);
  if (!context) {
    throw new Error(
      "useTrackContext doit être utilisé à l'intérieur d'un TrackProvider"
    );
  }
  return context;
};
