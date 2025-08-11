'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { ProjectDialog } from '../components/ProjectDialog'
import projectData from '@/data/data.json'

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const projects = projectData.projects

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
            className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
          >
            <Image
              src={project.preview}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-fit object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 text-black dark:text-white">
                {project.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <Button 
                variant="outline" 
                className="text-black dark:text-white border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                onClick={() => setSelectedProject(project)}
              >
                View Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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

