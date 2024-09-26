"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message");

  return (
    <p className="text-[#9C9A9A] animate-pulse max-w-64">
      {errorMessage || "An unknown error occurred."}
    </p>
  );
}

export default function ErrorPage() {
  return (
    <main className="flex flex-col h-dvh w-screen items-center justify-center p-24 gap-4">
      <h1 className="text-xl font-bold">Error</h1>
      <Suspense
        fallback={<p className="text-[#9C9A9A] animate-pulse">Loading...</p>}
      >
        <ErrorContent />
      </Suspense>
      <Link
        href="/"
        className="flex items-center gap-2 py-3 px-4 text-sm bg-[#F1F1F1] rounded-md font-medium mt-1 shadow-sm hover:shadow-md transition-shadow duration-500 ease-in-out"
      >
        Try again
      </Link>
    </main>
  );
}
