"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <main className="flex flex-col h-dvh w-screen items-center justify-center p-24 gap-4">
      <h1 className="text-xl font-bold">Error 404</h1>
      <p className="text-[#9C9A9A] animate-pulse max-w-64">Page not found...</p>
      <Link
        href="/"
        className="flex items-center gap-2 py-3 px-4 text-sm bg-[#F1F1F1] rounded-md font-medium mt-1 shadow-sm hover:shadow-md transition-shadow duration-500 ease-in-out"
      >
        Home page
      </Link>
    </main>
  );
}
