import Polaroid from './Polaroid'

export default function About() {
  return (
    <section className="container mx-auto px-4 py-16" id="about">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-2/5">
          <Polaroid src="/img/underwater.jpg" alt="underwater" caption="23-02-2020"/>
        </div>
        <div className="w-full md:w-3/5">
          <h2 className="text-2xl font-bold mb-6">About Me</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {`I'm a passionate web developer who started out in 2018 back when JavaScript callbacks were still cool. I've since evolved with the industry, embracing modern development practices and leading teams to deliver exceptional user experiences.`}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {`Currently, I'm focused on building accessible, human-centered products at the intersection of design and technology.`}
          </p>
        </div>
      </div>
    </section>
  )
}

