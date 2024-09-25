"use client";

import HoveredTrack from "@/components/HoveredTrack";
import LoaderScreen from "@/components/LoaderScreen";
import LoginPage from "@/components/LoginPage";
import Scene from "@/components/Scene";
import SelectedTrack from "@/components/SelectedTrack";
import { TrackProvider } from "@/context/TrackContext";
import { Track } from "@/lib/types";
import { ScrollControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Suspense, useCallback, useEffect, useState } from "react";

export default function Home() {
  // CHECK SI LA ROUTE EST JUSTE "/"
  const [isRoot, setIsRoot] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsRoot(window.location.pathname === "/");
    }
  }, []);

  // STATES
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);

  // FUNCTIONS
  const fetchTopTracks = useCallback(async () => {
    if (!accessToken) return;

    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch top tracks");
      }

      const data = await response.json();
      // console.log(data);
      setTopTracks(data.items);
      setError(null);
    } catch (err) {
      console.error("Error fetching top tracks:", err);
      setError("Failed to fetch top tracks. Please try again.");
    }
  }, [accessToken]);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    if (token) {
      setAccessToken(token);
      localStorage.setItem("spotify_access_token", token);
      fetchTopTracks();
    }
  }, [fetchTopTracks]);

  // LOADING
  const { progress } = useProgress();

  return (
    <TrackProvider>
      <main className="h-dvh w-screen relative overflow-hidden">
        {accessToken ? (
          <>
            {/* LOADING */}
            <AnimatePresence>
              {progress < 100 && <LoaderScreen />}
            </AnimatePresence>

            {/* SELECTED TRACK */}
            <SelectedTrack />

            {/* HOVERED TRACK */}
            <HoveredTrack />

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-center mb-4 fixed top-5 left-5">
                {error}
              </p>
            )}

            {/* BLUR SHAPES */}
            <div className="pointer-events-none select-none">
              <Image
                src="/img/topright.svg"
                width={682}
                height={381}
                alt="Blurry shape on the top right corner"
                className="absolute top-0 right-0 z-10"
              />
              <Image
                src="/img/bottomleft.svg"
                width={856}
                height={433}
                alt="Blurry shape on the bottom left corner"
                className="absolute bottom-0 left-0 z-10"
              />
            </div>

            {/* R3F CANVAS */}
            <Canvas>
              <Suspense fallback={null}>
                <ScrollControls
                  horizontal={false}
                  pages={topTracks.length / 2.5}
                  damping={0.01}
                >
                  <Scene trackList={topTracks} />
                </ScrollControls>
              </Suspense>
            </Canvas>
          </>
        ) : isRoot ? (
          <LoginPage />
        ) : (
          <></>
        )}
      </main>
    </TrackProvider>
  );
}
