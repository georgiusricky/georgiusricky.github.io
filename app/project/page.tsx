'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ProjectDialog } from '../components/ProjectDialog'
import { useGlobalStore } from '@/stores/globalStore'

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const projects = useGlobalStore((state) => state.projects)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mt-12 mx-auto px-4 py-16 bg-white dark:bg-black">
      <h1 className="text-3xl font-bold mb-12 text-black dark:text-white">All Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-card hover:bg-card-hover rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <Image
              src={project.preview}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-fit object-cover mt-4"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 text-black dark:text-white">
                {project.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
            </div>
          </div>
        ))}
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

