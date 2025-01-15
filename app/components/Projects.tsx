import Image from 'next/image'

export default function Projects() {
  const projects = [
    {
      title: 'Project One',
      description: 'A modern web application built with Next.js and TypeScript.',
      image: '/placeholder.svg'
    },
    {
      title: 'Project Two',
      description: 'Mobile-first responsive design implementation.',
      image: '/placeholder.svg'
    },
    {
      title: 'Project Three',
      description: 'Full-stack application with real-time features.',
      image: '/placeholder.svg'
    }
  ]

  return (
    <section className="container mx-auto px-4 py-16" id="projects">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl mb-16 text-center text-black dark:text-white">
          <span className="font-light">My</span>
          <span className="font-extrabold">Projects</span>
        </h2>

      <div className="space-y-12">
          {projects.map((project, index) => (
            <div key={index} className="group">
              <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

