"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message");

  return (
    <p className="text-red-400">
      {errorMessage || "An unknown error occurred"}
    </p>
  );
}

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8">Error</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorContent />
      </Suspense>
    </main>
  );
}
