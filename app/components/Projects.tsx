'use client'

import { useState } from 'react'
import Image from 'next/image'
import LoadingLink from './LoadingLink'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { ProjectDialog } from './ProjectDialog'
import { useGlobalStore } from '@/stores/globalStore'

export default function Projects() {
  const projects = useGlobalStore((state) => state.projects).slice(0, 3)

  const [selectedProject, setSelectedProject] = useState<any>(null)

  return (
    <section className="bg-white dark:bg-black py-16" id="projects">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl mb-16 text-center text-black dark:text-white">
            <span className="font-light">Side </span>
            <span className="font-extrabold">Hustles</span>
          </h2>
          <div className="space-y-24">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <h3 className="text-gray-600 dark:text-gray-400 mb-2">{project.id}</h3>
                  <h4 className="text-2xl font-bold text-black dark:text-white mb-4">{project.title}</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{project.description}</p>
                  <Button 
                    variant="outline" 
                    className="text-black dark:text-white border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="w-full md:w-1/2">
                  <Image
                    src={project.preview}
                    alt={project.title}
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full rounded-lg"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <LoadingLink href="/project">
              <Button variant="outline" className="text-black dark:text-white border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </LoadingLink>
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectDialog 
          project={selectedProject}
          open={!!selectedProject}
          onOpenChange={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}

