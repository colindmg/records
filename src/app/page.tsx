"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string; height: number; width: number }[];
  };
}

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    if (token) {
      setAccessToken(token);
      localStorage.setItem("spotify_access_token", token);
    }
  }, []);

  const fetchTopTracks = async () => {
    if (!accessToken) return;

    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/top/tracks?limit=25",
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
      setTopTracks(data.items);
      setError(null);
    } catch (err) {
      console.error("Error fetching top tracks:", err);
      setError("Failed to fetch top tracks. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Spotify Top Tracks</h1>
      {accessToken ? (
        <div className="w-full max-w-4xl">
          <p className="mb-4 text-center">Vous êtes connecté !</p>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-8 mx-auto block"
            onClick={fetchTopTracks}
          >
            Voir mes top tracks Spotify
          </button>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {topTracks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topTracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <Image
                    src={track.album.images[0]?.url || "/placeholder.svg"}
                    alt={track.album.name}
                    width={200}
                    height={200}
                    className="w-full h-auto mb-2 rounded"
                  />
                  <h3 className="font-bold text-lg mb-1">{track.name}</h3>
                  <p className="text-gray-600">
                    {track.artists.map((a) => a.name).join(", ")}
                  </p>
                  <p className="text-gray-500 text-sm">{track.album.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          href="/api/login"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Login with Spotify
        </Link>
      )}
    </main>
  );
}
