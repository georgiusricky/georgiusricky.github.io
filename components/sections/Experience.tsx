'use client'

import Image from 'next/image'
import { useGlobalStore } from '@/stores/globalStore'
import { SectionHeader } from '@/components/ui/SectionHeader'

export default function Experience() {
  const experiences = useGlobalStore((state) => state.experiences)

  return (
    <section className="bg-black dark:bg-white py-32" id="experience">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader lightText="Where " boldText="I've Been" variant="light" />
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 dark:border-black/10 p-8 hover:bg-zinc-800 hover:dark:bg-zinc-200 bg-black/20 dark:bg-white/20"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 md:w-12 md:h-12 relative flex-shrink-0 rounded-xl overflow-hidden">
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          fill
                          sizes="(min-width: 768px) 48px, 64px"
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h2 className="text-md md:text-lg font-semibold text-white dark:text-black">
                          {exp.company}{' '}
                          <span className="hidden md:inline font-normal text-gray-400 dark:text-gray-500">
                            | {exp.location}
                          </span>
                          <span className="block md:hidden font-normal text-gray-400 dark:text-gray-500 text-sm">
                            {exp.location}
                          </span>
                        </h2>
                        <span className="text-gray-300 dark:text-gray-600 text-sm">
                          {exp.period.start} - {exp.period.end}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-md font-semibold text-white/90 dark:text-black/90">
                    <span>{exp.title}</span>
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
