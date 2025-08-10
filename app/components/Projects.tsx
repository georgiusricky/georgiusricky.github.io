'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { ProjectDialog } from './ProjectDialog'
import projectData from '@/data/data.json'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const projects = projectData.projects.slice(0, 3)

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
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/projects">
              <Button variant="outline" className="text-black dark:text-white border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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

