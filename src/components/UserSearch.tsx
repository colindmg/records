"use client";

import { useState } from "react";

export default function UserSearch({
  onSearch,
}: {
  onSearch: (username: string) => void;
}) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <input
        type="text"
        placeholder="Entrez un pseudo Spotify"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
}
