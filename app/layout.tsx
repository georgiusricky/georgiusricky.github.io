import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navigation from './components/Navigation'
import LoadingOverlay from './components/LoadingOverlay'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Ricky - Software Engineer",
  description: 'Personal portfolio website of Ricky',
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
