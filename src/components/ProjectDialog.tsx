'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Github, ExternalLink } from 'lucide-react'

interface ProjectDialogProps {
  project: {
    id: string
    title: string
    fullDescription: string
    technologies: string[]
    images: string[]
    githubLink: string
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-4xl bg-white/60 dark:bg-black/60 backdrop-blur-md"
      >
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">{project.title}</DialogTitle>
          <DialogDescription className="text-gray-700 dark:text-gray-300">
            {project.fullDescription}
          </DialogDescription>
        </DialogHeader>
        
        {/* Horizontal scrollable image gallery */}
        <div className="w-full overflow-x-auto">
          <div className="flex space-x-4 pb-4">
            {project.images.map((image, index) => (
              <Image 
                key={index}
                src={image} 
                alt={`${project.title} screenshot ${index + 1}`}
                width={600}
                height={400}
                className="flex-shrink-0 rounded-lg object-cover"
                style={{ 
                  maxWidth: '80%', 
                  height: 'auto', 
                  aspectRatio: '16/9' 
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded-md text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex space-x-4 mt-4">
              <Link href={project.githubLink} target="_blank">
                <Button variant="outline" className="text-black dark:text-white border-black dark:border-white">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Button>
              </Link>
              <Link href={project.liveLink} target="_blank">
                <Button variant="outline" className="text-black dark:text-white border-black dark:border-white">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

