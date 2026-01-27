'use client'

import { useRouter, usePathname } from 'next/navigation'
import LoadingLink from '@/components/shared/LoadingLink'
import { navItems } from './NavItems'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const router = useRouter()
  const pathname = usePathname()

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
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
    onClose()
  }

  return (
    <div
      className={`fixed top-[95px] left-0 right-0 bottom-0 z-40 md:hidden mobile-menu transition-all duration-500 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute top-0 right-0 w-80 h-full bg-white/60 dark:bg-black/50 backdrop-blur-md border-l border-gray-200/20 dark:border-gray-700/20 shadow-2xl transform transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 space-y-2">
          {navItems.map((item, index) =>
            item.href.startsWith('#') ? (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleMobileNavClick(e, item.href)}
                className={`group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transform hover:scale-105 ${
                  isOpen ? 'animate-in slide-in-from-right' : ''
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
                  isOpen ? 'animate-in slide-in-from-right' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={onClose}
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
            <p>© {new Date().getFullYear()} Ricky</p>
            <p className="mt-1">Software Engineer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
