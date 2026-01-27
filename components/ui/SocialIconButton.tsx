import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SocialIconButtonProps {
  href: string
  icon: React.ReactNode
  ariaLabel: string
  className?: string
}

export function SocialIconButton({
  href,
  icon,
  ariaLabel,
  className
}: SocialIconButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        'p-2 border border-gray-300 dark:border-gray-700 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
        className
      )}
    >
      {icon}
    </Link>
  )
}
