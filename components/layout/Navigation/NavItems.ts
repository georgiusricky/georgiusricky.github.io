export interface NavItem {
  href: string
  label: string
  icon: string
}

export const navItems: NavItem[] = [
  { href: '#about', label: 'About Me', icon: '👨‍💻' },
  { href: '#experience', label: 'Experience', icon: '💼' },
  { href: '#skills', label: 'Skills', icon: '⚡' },
  { href: '/project', label: 'Projects', icon: '🚀' },
  { href: '/playground', label: 'Playground', icon: '🎮' },
  { href: '#contact', label: 'Contact Me', icon: '📧' },
]
