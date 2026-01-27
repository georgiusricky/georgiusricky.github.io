export interface NavItem {
  href: string
  label: string
}

export const navItems: NavItem[] = [
  { href: '#about', label: 'About Me' },
  { href: '#skills', label: 'Skills' },
  { href: '/project', label: 'Projects' },
  { href: '/playground', label: 'Playground' },
  { href: '#contact', label: 'Contact' },
]
