'use client'

import Image from 'next/image'

export default function Skills() {
  const skills = [
    { icon: '/img/placeholder.svg', name: 'Git' },
    { icon: '/img/placeholder.svg', name: 'Javascript', darkMode: true },
    { icon: '/img/placeholder.svg', name: 'Sass/Scss' },
    { icon: '/img/placeholder.svg', name: 'Nest.Js' },
    { icon: '/img/placeholder.svg', name: 'Storybook' },
    { icon: '/img/placeholder.svg', name: 'Next.Js' },
    { icon: '/img/placeholder.svg', name: 'TypeScript' },
    { icon: '/img/placeholder.svg', name: 'React' },
    { icon: '/img/placeholder.svg', name: 'Socket.io' },
    { icon: '/img/placeholder.svg', name: 'TailwindCSS' }
  ]

  return (
    <section className="bg-white dark:bg-black py-32" id="skills">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl mb-16 text-center text-black dark:text-white">
            <span className="font-light">My</span>{' '}
            <span className="font-extrabold">Skills</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className={`aspect-square flex flex-col items-center justify-center p-6 border border-gray-200 dark:border-gray-800 
                  hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black transition-colors
                `}
              >
                <div className="w-12 h-12 relative mb-4">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className={`text-sm font-medium transition-colors group-hover:text-white group-hover:dark:text-black`}>
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

