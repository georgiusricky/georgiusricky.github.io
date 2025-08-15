'use client';

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PlaygroundNotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="container mt-12 mx-auto px-4 py-16 bg-white dark:bg-black">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            The playground item you're looking for doesn't exist.
          </p>
        </div>
        
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
