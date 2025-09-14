import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navigation from './components/Navigation'
import LoadingOverlay from './components/LoadingOverlay'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://rickygeorgius.com'),
  title: "Ricky - Software Engineer & Full Stack Developer",
  description: 'Personal portfolio website of Ricky, a passionate Software Engineer specializing in React, Next.js, TypeScript, and modern web technologies. View projects, skills, and experience.',
  keywords: [
    'Ricky',
    'Ricky Portfolio',
    'Ricky Georgius',
    'Ricky Georgius Portfolio',
    'georgiusricky',
    'Ricky Singkawang',
    'Web Developer Freelancer ',
    'Web Developer Freelancer Indonesia',
    'Ricky Web Developer Indonesia',
    'Ricky Frontend Developer',
    'Software Engineer',
    'Full Stack Developer',
    'React Developer',
    'Ricky Vue Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Web Developer',
    'Frontend Developer',
    'JavaScript Developer',
  ].join(', '),
  authors: [{ name: 'Ricky' }],
  creator: 'Ricky',
  publisher: 'Ricky',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rickygeorgius.com',
    siteName: 'Ricky Portfolio',
    title: 'Ricky - Software Engineer & Full Stack Developer',
    description: 'Personal portfolio website of Ricky, a passionate Software Engineer specializing in React, Next.js, TypeScript, and modern web technologies.',
    images: [
      {
        url: '/img/profile.webp',
        width: 1200,
        height: 630,
        alt: 'Ricky - Software Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ricky - Software Engineer & Full Stack Developer',
    description: 'Personal portfolio website of Ricky, a passionate Software Engineer specializing in React, Next.js, TypeScript, and modern web technologies.',
    images: ['/img/profile.webp'],
    creator: '@ricky',
    site: '@ricky',
  },
  alternates: {
    canonical: 'https://rickygeorgius.com',
  },
  category: 'technology',
  classification: 'Portfolio Website',
  icons: {
    icon: '/img/svg/logo-light.svg',
    apple: '/img/svg/logo-light.svg',
    shortcut: '/favicon.ico',
  },
  // Domain already verified via DNS TXT record in Hostinger
  // No need for HTML verification tags
  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Ricky Portfolio',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Navigation />
          <main>{children}</main>
          <LoadingOverlay />
        </ThemeProvider>
      </body>
    </html>
  )
}
