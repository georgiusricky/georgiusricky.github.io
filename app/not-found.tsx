import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Ricky Portfolio",
  description: "The page you're looking for doesn't exist. Return to Ricky's portfolio to explore projects and experience.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="container mt-12 mx-auto px-4 py-16 bg-white dark:bg-black">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            {`The page you're looking for doesn't exist.`}
          </p>
        </div>
        
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
} 
