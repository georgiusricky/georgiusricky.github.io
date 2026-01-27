'use client'

import { Github, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { useGlobalStore } from '@/stores/globalStore'
import { SocialIconButton } from '@/components/ui/SocialIconButton'
import Polaroid from '@/components/shared/Polaroid'

export default function Hero() {
  const socials = useGlobalStore((state) => state.socials)
  const experiences = useGlobalStore((state) => state.experiences)

  const firstYear = Number(experiences.at(-1)?.period.start.split(' ')[1])
  const endDate = experiences[0]?.period.end
  const lastYear = endDate === 'Present' ? new Date().getFullYear() : Number(endDate?.split(' ')[1])
  const totalExpYear = lastYear - firstYear

  return (
    <section className="container mx-auto px-4 pt-56 pb-16 md:pt-64 md:pb-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-6/12 mb-8 md:mb-0">
          <h1 className="text-4xl font-mono font-bold mb-4">
            {`Hello I'm`} <span className="block text-6xl">Ricky</span>
          </h1>
          <h2 className="text-3xl font-bold mb-4 font-mono">Software Engineer</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {`I'm a passionate web developer who began my journey in 2019. Over ${totalExpYear} years of experience, I've embraced modern development practices, continuously improving my skills to deliver exceptional user experiences. I thrive on taking on new challenges and enjoy learning something new to stay ahead in the ever-evolving tech landscape.`}
          </p>
          <div className="text-black dark:text-white mb-8 flex items-center font-semibold">
            <span>Based in Earth</span>
            <Image
              src="/img/gif/earth.gif"
              alt="Earth"
              width={50}
              height={50}
              sizes="50px"
              className="w-[50px] h-[50px] object-contain"
              priority={false}
            />
          </div>
          <div className="flex space-x-4">
            <SocialIconButton
              href={socials.github}
              icon={<Github className="w-5 h-5" aria-hidden="true" />}
              ariaLabel="Visit my GitHub profile"
            />
            <SocialIconButton
              href={socials.linkedin}
              icon={<Linkedin className="w-5 h-5" aria-hidden="true" />}
              ariaLabel="Visit my LinkedIn profile"
            />
            <SocialIconButton
              href={socials.upwork}
              icon={
                <Image
                  src="/img/svg/upwork.svg"
                  alt="upwork logo"
                  width={50}
                  height={50}
                  className="w-5 h-5 dark:invert dark:brightness-100"
                  aria-hidden="true"
                />
              }
              ariaLabel="Visit my Upwork profile"
            />
          </div>
        </div>
        <div className="w-full md:w-5/12 max-w-md">
          <Polaroid src="/img/underwater.webp" alt="underwater" />
        </div>
      </div>
    </section>
  )
}
