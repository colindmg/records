"use client";

import GenerateLinkButton from "@/components/GenerateLinkButton";
import Interface from "@/components/Interface";
import LoaderScreen from "@/components/LoaderScreen";
import LoginPage from "@/components/LoginPage";
import Scene from "@/components/Scene";
import { TrackProvider } from "@/context/TrackContext";
import { Track } from "@/lib/types";
import { ScrollControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
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
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [displayCopiedMessage, setDisplayCopiedMessage] = useState(false);

  // ROUTER
  const router = useRouter();

  // LOADING
  const { progress } = useProgress();

  // ---------------------------------------

  // FUNCTIONS

  // GESTION DE LA REQUETE POUR RECUPERER LES TOP TRACKS
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

  // ---------------------------------------

  // GENERATE LINK
  const generateLink = async () => {
    if (!accessToken || !topTracks.length) return;

    setIsGeneratingLink(true);
    try {
      const response = await fetch("/api/mongodb/generate-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ topTracks }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate link");
      }

      const data = await response.json();
      setGeneratedLink(data.link);
      // COPY TO CLIPBOARD
      navigator.clipboard.writeText(data.link);
      setCopiedToClipboard(true);
      setDisplayCopiedMessage(true);

      setTimeout(() => {
        setDisplayCopiedMessage(false);
      }, 2000);
    } catch (error) {
      console.error("Error generating link:", error);
      router.push("/error?message=Failed to generate link. Please try again.");
    } finally {
      setIsGeneratingLink(false);
    }
  };

  return (
    <TrackProvider>
      <main className="h-dvh w-screen relative overflow-hidden">
        {accessToken ? (
          <>
            {/* LOADING */}
            <AnimatePresence mode="wait">
              {progress < 100 && (
                <LoaderScreen message="Loading your top tracks..." />
              )}
            </AnimatePresence>

            <Interface itemsCount={topTracks.length} />

            {/* GENERATE LINK BUTTON */}
            <GenerateLinkButton
              generateLink={generateLink}
              isGeneratingLink={isGeneratingLink}
              copiedToClipboard={copiedToClipboard}
            />

            <AnimatePresence>
              {displayCopiedMessage && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(5px)", y: 20 }}
                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  }}
                  exit={{
                    opacity: 0,
                    filter: "blur(5px)",
                    y: -20,
                    transition: { duration: 0.5, ease: "easeOut", delay: 2 },
                  }}
                  className="bg-[#F1F1F1] py-1 px-3 rounded-sm absolute z-50 bottom-32 left-16 shadow-sm"
                >
                  <a
                    href={generatedLink || ""}
                    className="text-xs text-[#9C9A9A]"
                  >
                    {generatedLink}
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

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
