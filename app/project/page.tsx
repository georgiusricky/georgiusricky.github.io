'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ProjectDialog } from '@/components/sections/Projects/ProjectDialog'
import { useGlobalStore } from '@/stores/globalStore'
import { ExternalLink } from 'lucide-react'
import { TechPills } from '@/components/ui/TechPills'
import { PageHeader } from '@/components/ui/PageHeader'
import type { Project } from '@/types'

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const projects = useGlobalStore((state) => state.projects)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-24">
        <PageHeader
          title="All Projects"
          description="A collection of projects I've worked on, from full-stack applications to frontend development."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-zinc-50 dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={project.preview}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white dark:bg-zinc-900 rounded-full p-3 shadow-lg">
                      <ExternalLink className="w-5 h-5 text-zinc-900 dark:text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <TechPills technologies={project.technologies} maxVisible={3} size="sm" className="mb-3" />
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          open={!!selectedProject}
          onOpenChange={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}
