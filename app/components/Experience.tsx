'use client'

import Image from 'next/image'
import experienceData from '@/data/data.json'

export default function Experience() {
  const experiences = experienceData.experiences

  return (
    <section className="bg-black dark:bg-white py-32" id="experience">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-16 text-center text-white dark:text-black">
            <span className="font-light">My</span>{' '}
            <span className="font-extrabold">Experience</span>
          </h1>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`rounded-2xl border border-white/10 dark:border-black/10 p-8 ${
                  index === 1 ? 'bg-zinc-800 dark:bg-zinc-200' : 'bg-black/20 dark:bg-white/20'
                }`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 relative">
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          width={30}
                          height={30}
                          className="object-contain"
                        />
                      </div>
                      <h2 className="text-xl font-semibold text-white dark:text-black">
                        {exp.title}
                      </h2>
                    </div>
                    <span className="text-gray-400 dark:text-gray-600 text-sm">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-300 dark:text-gray-700 leading-relaxed text-base">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

