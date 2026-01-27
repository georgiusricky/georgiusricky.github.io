'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LoadingLink from '@/components/shared/LoadingLink'
import { ThemeToggle } from './ThemeToggle'
import { navItems } from './NavItems'

interface NavBarProps {
  bgClass: string
  isMobileMenuOpen: boolean
  onMobileMenuToggle: (event: React.MouseEvent) => void
}

export function NavBar({ bgClass, isMobileMenuOpen, onMobileMenuToggle }: NavBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme } = useTheme()

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
  }

  const handleDownloadCV = () => {
    window.open('/pdf/resume_ricky.pdf', '_blank')
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass} backdrop-blur-md`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <LoadingLink href="/" className="block">
          <Image
            src={theme === 'dark' ? '/img/svg/logo-light.svg' : '/img/svg/logo-dark.svg'}
            alt="Ricky Logo"
            width={160}
            height={50}
            priority
            draggable={false}
          />
        </LoadingLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) =>
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
          )}
          <Button
            variant="default"
            className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            onClick={handleDownloadCV}
          >
            CV <Download className="ml-2 h-4 w-4" />
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="default"
            className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            onClick={handleDownloadCV}
          >
            CV <Download className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileMenuToggle}
            className="relative group"
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <span
                className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                }`}
              />
            </div>
          </Button>
        </div>
      </div>
    </nav>
  )
}
