'use client'

import { useState, useEffect, useRef } from 'react'
import LoadingLink from './LoadingLink'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Download, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from "next/image"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
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
      setTimeout(() => scrollToSection(sectionId), 100)
    }
    setIsMobileMenuOpen(false)
  }

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href.startsWith('#')) {
      const sectionId = href.slice(1)
      if (pathname === '/') {
        scrollToSection(sectionId)
      } else {
        router.push(`/#${sectionId}`)
        setTimeout(() => scrollToSection(sectionId), 100)
      }
    } else {
      router.push(href)
    }
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMobileMenuOpen(prev => !prev)
  }

  const navItems = [
    { href: '#about', label: 'About Me', icon: '👨‍💻' },
    { href: '#skills', label: 'Skills', icon: '⚡' },
    { href: '/project', label: 'Projects', icon: '🚀' },
    { href: '/playground', label: 'Playground', icon: '🎮' },
    { href: '#contact', label: 'Contact Me', icon: '📧' },
  ]

  const bgClass = isScrolled ? 'bg-white/60 dark:bg-black/50' : 'bg-white/90 dark:bg-black/90'

  if (!isClient) {
    return null
  }

  return (
    <>
      <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass} backdrop-blur-md`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
         <LoadingLink href="/" className="block">
            <Image
              src={theme === "dark" ? "/img/svg/logo-light.svg" :"/img/svg/logo-dark.svg"}
              alt="Ricky Logo"
              width={160}
              height={50}
              priority
              draggable={false}
            />
          </LoadingLink>
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
                <LoadingLink
                  key={item.href}
                  href={item.href}
                  className="text-sm hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {item.label}
                </LoadingLink>
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
              <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
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
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => toggleMobileMenu(e)}
              className="relative group"
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                }`} />
                <span className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                }`} />
              </div>
            </Button>
          </div>
        </div>
      </nav>
      
      <div className={`fixed top-[95px] left-0 right-0 bottom-0 z-40 md:hidden mobile-menu transition-all duration-500 ${
        isMobileMenuOpen 
          ? 'opacity-100 visible' 
          : 'opacity-0 invisible'
      }`}>
        <div 
          className={`absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        <div className={`absolute top-0 right-0 w-80 h-full bg-white/60 dark:bg-black/50 backdrop-blur-md border-l border-gray-200/20 dark:border-gray-700/20 shadow-2xl transform transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-4 space-y-2">
            {navItems.map((item, index) => 
              item.href.startsWith('#') ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleMobileNavClick(e, item.href)}
                  className={`group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transform hover:scale-105 ${
                    isMobileMenuOpen ? 'animate-in slide-in-from-right' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className="text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {item.label}
                  </span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </span>
                </a>
              ) : (
                <LoadingLink
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transform hover:scale-105 ${
                    isMobileMenuOpen ? 'animate-in slide-in-from-right' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className="text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {item.label}
                  </span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </span>
                </LoadingLink>
              )
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/20 dark:border-gray-700/20">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>© 2024 Ricky</p>
              <p className="mt-1">Software Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

