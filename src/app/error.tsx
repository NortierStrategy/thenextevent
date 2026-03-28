"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[TNE] Unhandled error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-6">
      <div className="text-center max-w-md">
        <h1 className="font-playfair text-5xl text-text mb-4">Oops</h1>
        <p className="font-outfit text-text-muted text-base mb-8 leading-relaxed">
          Une erreur inattendue s&apos;est produite.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 font-outfit text-[11px] font-bold uppercase tracking-[3px] text-white bg-gradient-to-br from-red to-red-dark rounded-[2px] hover:shadow-[0_0_25px_rgba(155,27,36,0.4)] transition-all duration-300"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="px-6 py-3 font-outfit text-[11px] font-bold uppercase tracking-[3px] text-text border border-red/20 rounded-[2px] hover:border-red/40 transition-all duration-300"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
