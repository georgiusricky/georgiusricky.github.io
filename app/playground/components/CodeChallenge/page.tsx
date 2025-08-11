"use client";

import Link from "next/link";

export default function CodeChallenge() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-black dark:text-white mb-3">
        Code Challenge
      </h2>
      <p className="text-muted-foreground text-md leading-relaxed">
        I regularly take on coding challenges from{" "}
        <strong>Codewars</strong> and <strong>HackerRank</strong> to improve my
        problem-solving skills and explore new programming approaches.  
        You can check out my solutions and explanations in my GitHub repository.
      </p>

      <Link
        href="https://github.com/georgiusricky/code-challenge"
        target="_blank"
        className="inline-block mt-5 px-5 py-2 rounded-lg transition-colors"
      >
        View on GitHub
      </Link>
    </div>
  );
}
