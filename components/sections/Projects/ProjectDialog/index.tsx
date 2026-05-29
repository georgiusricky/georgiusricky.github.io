'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Github, ExternalLink } from 'lucide-react'
import { TechPills } from '@/components/ui/TechPills'
import { ImageGallery } from './ImageGallery'
import { ZoomModal } from './ZoomModal'
import type { Project } from '@/types'

interface ProjectDialogProps {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDialog({ project, open, onOpenChange }: ProjectDialogProps) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[95dvh] overflow-hidden bg-white dark:bg-zinc-900 border-0 p-0 rounded-2xl shadow-2xl">
          {/* Content Section */}
          <div className="p-6 pb-4 space-y-3">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-white">
                {project.title}
              </DialogTitle>
              {project.liveLink && (
                <Link href={project.liveLink} target="_blank">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Site
                  </span>
                </Link>
              )}
              {!project.liveLink && project.demoLink && (
                <Link href={project.demoLink} target="_blank">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Demo
                  </span>
                </Link>
              )}
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Image Gallery Section */}
          <ImageGallery
            assets={project.assets}
            title={project.title}
            onImageClick={setZoomedImage}
          />

          {/* Bottom Section - Technologies and Links */}
          <div className="p-6 pt-4 space-y-3">
            <TechPills technologies={project.technologies} />

            {(project.githubLink || (project.demoLink && project.liveLink)) && (
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
                  {project.demoLink && project.liveLink && (
                    <Link href={project.demoLink} target="_blank">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Demo
                      </button>
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {mounted && zoomedImage && (
        <ZoomModal src={zoomedImage} onClose={() => setZoomedImage(null)} />
      )}
    </>
  )
}
