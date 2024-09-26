"use client";

import Interface from "@/components/Interface";
import LoaderScreen from "@/components/LoaderScreen";
import Scene from "@/components/Scene";
import { TrackProvider } from "@/context/TrackContext";
import { Track } from "@/lib/types";
import { ScrollControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function SharePage({ params }: { params: { userId: string } }) {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { progress } = useProgress();
  const router = useRouter();

  useEffect(() => {
    const fetchTracks = async () => {
      console.log(params.userId);
      try {
        const response = await fetch(
          `/api/mongodb/get-top-tracks/${params.userId}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            router.push("/error");
          } else {
            throw new Error("Failed to fetch tracks");
          }
        }
        const data = await response.json();
        setTopTracks(data.topTracks);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        router.push("/error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [params.userId, router]);

  if (isLoading) {
    return <LoaderScreen message={`Loading @${params.userId} top tracks...`} />;
  }

  return (
    <TrackProvider>
      <main className="h-dvh w-screen relative overflow-hidden">
        <AnimatePresence mode="wait">
          {progress < 100 && (
            <LoaderScreen message={`Loading @${params.userId} top tracks...`} />
          )}
        </AnimatePresence>

        <Interface itemsCount={topTracks.length} />

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
      </main>
    </TrackProvider>
  );
}
