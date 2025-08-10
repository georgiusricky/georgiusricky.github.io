import Polaroid from './Polaroid'
import { experiences } from '@/data/data.json'

export default function About() {
  const firstYear = Number(experiences.at(-1)?.period.start.split(' ')[1])
  const lastYear = Number(experiences[0]?.period.end.split(' ')[1])
  const totalExpYear = lastYear - firstYear
  
  return (
    <section className="container mx-auto px-4 py-16" id="about">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-2/5">
          <Polaroid src="/img/underwater.jpg" alt="underwater" caption="23-02-2020"/>
        </div>
        <div className="w-full md:w-3/5">
          <h2 className="text-2xl font-bold mb-6">About Me</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {`I’m a passionate web developer who began my journey in 2019. Over ${totalExpYear} years of experience, I’ve embraced modern development practices, continuously improving my skills to deliver exceptional user experiences. I thrive on taking on new challenges and enjoy learning something new to stay ahead in the ever-evolving tech landscape.`}
          </p>
        </div>
      </div>
    </section>
  )
}

