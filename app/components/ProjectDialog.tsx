'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Github, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react'

// Separate ZoomModal component
function ZoomModal({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image */}
      <Image
        src={src}
        alt="Zoomed Image"
        width={0}
        height={0}
        sizes="95vw"
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "95vw",
          maxHeight: "95dvh",
        }}
        className="rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  );
}

interface ProjectDialogProps {
  project: {
    id: string
    title: string
    fullDescription: string
    technologies: string[]
    assets: string[]
    githubLink: string
    demoLink: string
    liveLink: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDialog({
  project,
  open,
  onOpenChange
}: ProjectDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % project.assets.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + project.assets.length) % project.assets.length);
  };

  const hasLinks = project.githubLink || project.demoLink || project.liveLink;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="max-w-5xl max-h-[95dvh] overflow-hidden bg-white dark:bg-zinc-900 border-0 p-0 rounded-2xl shadow-2xl"
        >
          {/* Content Section - Now on top */}
          <div className="p-6 pb-4 space-y-3">
            <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-white">
              {project.title}
            </DialogTitle>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Image Gallery Section */}
          <div className="relative bg-zinc-100 dark:bg-zinc-800">
            {/* Main Image Display */}
            <div className="relative aspect-video w-full overflow-hidden">
              {project.assets.map((src, index) => {
                const isVideo = src.endsWith('.webm') || src.endsWith('.mp4');
                const isActive = index === currentIndex;

                return isVideo ? (
                  <video
                    key={index}
                    src={src}
                    autoPlay
                    controls
                    loop
                    muted
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    key={index}
                    src={src}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className={`object-contain cursor-pointer transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={() => setZoomedImage(src)}
                  />
                );
              })}

              {/* Navigation Arrows */}
              {project.assets.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {project.assets.length > 1 && (
              <div className="flex justify-center gap-1.5 py-2 px-4 bg-zinc-200/50 dark:bg-zinc-700/50">
                {project.assets.map((src, index) => {
                  const isVideo = src.endsWith('.webm') || src.endsWith('.mp4');
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`relative w-14 h-9 rounded overflow-hidden transition-all ${
                        index === currentIndex
                          ? 'ring-2 ring-emerald-500 ring-offset-1 ring-offset-zinc-200 dark:ring-offset-zinc-700'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      {isVideo ? (
                        <div className="w-full h-full bg-zinc-300 dark:bg-zinc-600 flex items-center justify-center">
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Video</span>
                        </div>
                      ) : (
                        <Image
                          src={src}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Section - Technologies and Links */}
          <div className="p-6 pt-4 space-y-3">
            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            {hasLinks && (
              <>
                <div className="border-t border-zinc-200 dark:border-zinc-700" />
                <div className="flex flex-wrap gap-2">
                  {project.githubLink && (
                    <Link href={project.githubLink} target="_blank">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors">
                        <Github className="w-3.5 h-3.5" />
                        GitHub
                      </button>
                    </Link>
                  )}
                  {project.demoLink && (
                    <Link href={project.demoLink} target="_blank">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Demo
                      </button>
                    </Link>
                  )}
                  {project.liveLink && (
                    <Link href={project.liveLink} target="_blank">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Site
                      </button>
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Zoomed Image Modal */}
      {mounted && zoomedImage && (
        <ZoomModal src={zoomedImage} onClose={() => setZoomedImage(null)} />
      )}
    </>
  )
}
