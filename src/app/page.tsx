"use client";

import Interface from "@/components/Interface";
import LoaderScreen from "@/components/LoaderScreen";
import LoginPage from "@/components/LoginPage";
import Scene from "@/components/Scene";
import { TrackProvider } from "@/context/TrackContext";
import { Track } from "@/lib/types";
import { ScrollControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
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

  const router = useRouter();

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
    } catch (err) {
      console.error("Error fetching top tracks...", err);
      // REDIRIGER VERS LA PAGE D'ERREUR
      router.push(
        "/error?message=Failed to fetch top tracks. Please try again."
      );
    }
  }, [accessToken, router]);

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
            <AnimatePresence mode="wait">
              {progress < 100 && <LoaderScreen />}
            </AnimatePresence>

            <Interface itemsCount={topTracks.length} />

            {/* R3F CANVAS */}
            <Canvas>
              <Suspense fallback={null}>
                <ScrollControls
                  eps={0.001}
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
