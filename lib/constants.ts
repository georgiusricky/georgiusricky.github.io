export const Z_INDEX = {
  navigation: 50,
  mobileMenu: 40,
  modal: 100,
  loadingOverlay: 9999,
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const SCROLL_THRESHOLD = 20
export const LOADING_DELAY = 100
export const COPY_FEEDBACK_DURATION = 1500
export const MOBILE_MENU_WIDTH = 'w-80'

export const NAV_ITEMS = [
  { href: '#about', label: 'About Me' },
  { href: '#skills', label: 'Skills' },
  { href: '/project', label: 'Projects' },
  { href: '/playground', label: 'Playground' },
  { href: '#contact', label: 'Contact' },
] as const

export const RESPONSIVE_IMAGE_SIZES = {
  card: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
  hero: '(max-width: 768px) 100vw, 50vw',
  full: '100vw',
} as const
