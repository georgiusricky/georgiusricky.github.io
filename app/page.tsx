import Hero from '@/components/sections/Hero'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import Playground from '@/components/sections/Playground'

export default function Home() {
  return (
    <main className="bg-white dark:bg-black">
      <div id="about">
        <Hero />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <Experience />
      <Projects />
      <Playground />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
