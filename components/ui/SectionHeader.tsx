import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  lightText: string
  boldText: string
  variant?: 'light' | 'dark'
  className?: string
}

export function SectionHeader({
  lightText,
  boldText,
  variant = 'dark',
  className
}: SectionHeaderProps) {
  const textColor = variant === 'dark'
    ? 'text-black dark:text-white'
    : 'text-white dark:text-black'

  return (
    <h2 className={cn('text-5xl font-bold mb-16 text-center', textColor, className)}>
      <span className="font-light">{lightText}</span>
      <span className="font-extrabold">{boldText}</span>
    </h2>
  )
}
