"use client";

import LoginPage from "@/components/LoginPage";
import Scene from "@/components/Scene";
import { Track } from "@/lib/types";
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useState } from "react";

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTopTracks = useCallback(async () => {
    if (!accessToken) return;

    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=25",
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
      console.log(data);
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

  return (
    <main className="h-dvh w-screen relative overflow-hidden">
      {accessToken ? (
        <>
          {error && (
            <p className="text-red-500 text-center mb-4 fixed top-5 left-5">
              {error}
            </p>
          )}
          {/* R3F CANVAS */}
          <Canvas>
            <Suspense fallback={null}>
              <Scene trackList={topTracks} />
            </Suspense>
          </Canvas>
        </>
      ) : (
        <LoginPage />
      )}
    </main>
  );
}
