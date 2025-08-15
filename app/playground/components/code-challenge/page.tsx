"use client";

import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { useGlobalStore } from "@/stores/globalStore";

export default function CodeChallenge() {
  const socials = useGlobalStore((state) => state.socials);

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

      {/* Profile Links */}
      <div className="flex flex-col gap-2 mt-5">
        <Link
          href={socials.codewars}
          target="_blank"
          className="flex items-center gap-3 px-5 py-2 rounded-lg transition-all hover:bg-accent hover:scale-[1.02]"
        >
          <Image
            src="/img/svg/codewars.svg"
            alt="Codewars Logo"
            width={40}
            height={40}
          />
          <span>Visit my Codewars Profile</span>
        </Link>

        <Link
          href={socials.hackerrank}
          target="_blank"
          className="flex items-center gap-3 px-5 py-2 rounded-lg transition-all hover:bg-accent hover:scale-[1.02]"
        >
          <Image
            src="/img/svg/hackerank.svg"
            alt="HackerRank Logo"
            width={40}
            height={40}
          />
          <span>Visit my HackerRank Profile</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-muted"></div>

      {/* GitHub Link */}
      <Link
        href="https://github.com/georgiusricky/code-challenge"
        target="_blank"
        className="flex items-center gap-3 px-5 py-2 rounded-lg transition-all hover:bg-accent hover:scale-[1.02]"
      >
        <Github className="h-7 w-7 text-black dark:text-white" />
        <span>Visit the GitHub repository</span>
      </Link>
    </div>
  );
}
