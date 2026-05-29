import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Playground | Ricky - Software Engineer',
  description:
    'A collection of coding experiments, playful UI ideas, and fun components exploring new technologies and sharpening skills.',
  openGraph: {
    title: 'Playground | Ricky - Software Engineer',
    description:
      'A collection of coding experiments, playful UI ideas, and fun components exploring new technologies and sharpening skills.',
    url: 'https://rickygeorgius.com/playground/',
  },
  alternates: {
    canonical: 'https://rickygeorgius.com/playground/',
  },
}

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
