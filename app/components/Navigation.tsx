'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Download, Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsClient(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    if (pathname === '/') {
      scrollToSection(sectionId)
    } else {
      router.push(`/#${sectionId}`)
      // Add a small delay to allow the page to load before scrolling
      setTimeout(() => scrollToSection(sectionId), 100)
    }
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMobileMenuOpen(prev => !prev)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const navItems = [
    { href: '#about', label: 'About Me' },
    { href: '#skills', label: 'Skills' },
    { href: '/projects', label: 'Projects' },
    { href: '#contact', label: 'Contact Me' },
  ]

  const bgClass = isScrolled ? 'bg-white/60 dark:bg-black/50' : 'bg-white/90 dark:bg-black/90'

  if (!isClient) {
    return null
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass} backdrop-blur-md`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-5xl font-bold font-stitchParty tracking-wide" 
        >
          Ricky
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            item.href.startsWith('#') ? (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href.slice(1))}
                className="text-sm hover:text-gray-600 dark:hover:text-gray-300"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm hover:text-gray-600 dark:hover:text-gray-300"
              >
                {item.label}
              </Link>
            )
          ))}
          <Button
            variant="default"
            className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            onClick={() => window.open('/pdf/resume_ricky.pdf', '_blank')}
          >
            CV <Download className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        <div className="md:hidden flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="default"
            className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            onClick={() => window.open('/pdf/resume_ricky.pdf', '_blank')}
          >
            CV <Download className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={(e) => toggleMobileMenu(e)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden mobile-menu">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href.slice(1))}
              className="block py-2 px-4 text-sm transition-colors hover:bg-white/10 dark:hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

