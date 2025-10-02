import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Playground from './components/Playground'

export default function Home() {
  return (
    <main className="bg-white dark:bg-black">
      <Hero />
      <div id="about"><About /></div>
      <div id="skills"><Skills /></div>
      <Experience />
      <Projects />
      <Playground />
      <div id="contact"><Contact /></div>
      <Footer />
    </main>
  )
}

