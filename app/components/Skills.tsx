'use client'

import Image from 'next/image'
import data from '@/data/data.json'

export default function Skills() {
  const skills = data.skills

  return (
    <section className="bg-white dark:bg-black py-32" id="skills">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl mb-16 text-center text-black dark:text-white">
            <span className="font-light">My</span>{' '}
            <span className="font-extrabold">Skills</span>
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-8 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className={`aspect-square flex flex-col items-center justify-center p-6 border border-gray-200 dark:border-gray-800 
                  hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black transition-colors
                `}
              >
                <div className="w-3/6 h-3/6 relative mb-4">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain dark:drop-shadow-[0_0_1px_white]"
                  />
                </div>
                <span className={`text-xs md:text-sm font-medium transition-colors group-hover:text-white group-hover:dark:text-black `}>
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

