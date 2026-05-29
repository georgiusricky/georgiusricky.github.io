import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Ricky - Software Engineer',
  description:
    'A collection of projects by Ricky, from full-stack applications and mobile apps to frontend development and freelance work.',
  openGraph: {
    title: 'Projects | Ricky - Software Engineer',
    description:
      'A collection of projects by Ricky, from full-stack applications and mobile apps to frontend development and freelance work.',
    url: 'https://rickygeorgius.com/project/',
  },
  alternates: {
    canonical: 'https://rickygeorgius.com/project/',
  },
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
