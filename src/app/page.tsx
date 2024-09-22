"use client";

import UserSearch from "@/components/UserSearch";
import Image from "next/image";
import { useState } from "react";

interface SpotifyUser {
  display_name: string;
  followers: { total: number };
  images: { url: string }[];
}

export default function Home() {
  const [userData, setUserData] = useState<SpotifyUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (username: string) => {
    try {
      const response = await fetch(`/api/spotify?username=${username}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Error fetching user data");
      setUserData(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Spotify User Info</h1>
      <UserSearch onSearch={handleSearch} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {userData && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">{userData.display_name}</h2>
          <p>Followers: {userData.followers.total}</p>
          {userData.images[0] && (
            <Image
              width={100}
              height={100}
              src={userData.images[0].url}
              alt={userData.display_name}
              className="w-32 h-32 rounded-full mt-4"
            />
          )}
        </div>
      )}
    </main>
  );
}
