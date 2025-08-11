'use client'

import React, { useState } from 'react'
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
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent 
          className="max-w-6xl bg-card hover:bg-card-hover  backdrop-blur-md"
        >
          <DialogHeader>
            <DialogTitle className="text-black dark:text-white text-4xl mb-4">{project.title}</DialogTitle>
            <DialogDescription className="text-lg text-gray-700 dark:text-gray-300">
              {project.fullDescription}
            </DialogDescription>
          </DialogHeader>
          
          <div className="w-full overflow-x-auto">
            <div className="flex space-x-4 pb-4">
              {project.assets.map((src, index) => {
                const isVideo = src.endsWith('.webm') || src.endsWith('.mp4');

                return isVideo ? (
                  <video
                    key={index}
                    src={src}
                    width={800}
                    height={400}
                    autoPlay
                    controls
                    loop
                    muted
                    className="flex-shrink-0 rounded-lg object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    key={index}
                    src={src}
                    alt={`${project.title} screenshot ${index + 1}`}
                    width={1000}
                    height={400}
                    className="flex-shrink-0 rounded-lg object-cover cursor-pointer"
                    onClick={() => setZoomedImage(src)}
                    style={{ 
                      maxWidth: '80%', 
                      height: 'auto', 
                      aspectRatio: '16/9' 
                    }}
                  />
                );
              })}
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
                { project.githubLink && (
                   <Link href={project.githubLink} target="_blank">
                    <Button variant="outline" className="text-black dark:text-white border-black dark:border-white">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </Button>
                  </Link>
                )}
                { project.demoLink && (
                  <Link href={project.demoLink} target="_blank">
                    <Button variant="outline" className="text-black dark:text-white border-black dark:border-white">
                      <ExternalLink className="mr-2 h-4 w-4" /> Demo Site
                    </Button>
                  </Link>
                )}
                { project.liveLink && (
                  <Link href={project.liveLink} target="_blank">
                    <Button variant="outline" className="text-black dark:text-white border-black dark:border-white">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Site
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Zoomed Image Modal */}
      {zoomedImage && (
        <Dialog open={true} onOpenChange={() => setZoomedImage(null)}>
          <DialogContent className="max-w-[80vw] bg-black/80 backdrop-blur-md p-4">
            <DialogTitle></DialogTitle>
            <Image
              src={zoomedImage}
              alt="Zoomed Image"
              width={0} // required but can be 0 if using style
              height={0}
              sizes="80vw"
              style={{
                width: "80vw",
                height: "auto",
              }}
              className="rounded-lg object-contain"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}