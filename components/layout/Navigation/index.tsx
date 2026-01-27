'use client'

import { useState, useEffect } from 'react'
import { useScrollDetection } from '@/hooks/useScrollDetection'
import { NavBar } from './NavBar'
import { MobileMenu } from './MobileMenu'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const isScrolled = useScrollDetection()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [isMobileMenuOpen])

  const toggleMobileMenu = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsMobileMenuOpen((prev) => !prev)
  }

  const bgClass = isScrolled
    ? 'bg-white/60 dark:bg-black/50'
    : 'bg-white/90 dark:bg-black/90'

  if (!isClient) {
    return null
  }

  return (
    <>
      <NavBar
        bgClass={bgClass}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={toggleMobileMenu}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
