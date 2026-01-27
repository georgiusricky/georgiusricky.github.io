import { cn } from '@/lib/utils'

interface TechPillsProps {
  technologies: string[]
  maxVisible?: number
  size?: 'sm' | 'md'
  className?: string
}

export function TechPills({
  technologies,
  maxVisible,
  size = 'md',
  className
}: TechPillsProps) {
  const displayTechs = maxVisible ? technologies.slice(0, maxVisible) : technologies
  const remainingCount = maxVisible ? technologies.length - maxVisible : 0

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-[10px]'
    : 'px-2.5 py-1 text-xs'

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {displayTechs.map((tech, index) => (
        <span
          key={index}
          className={cn(
            'font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700',
            sizeClasses
          )}
        >
          {tech}
        </span>
      ))}
      {remainingCount > 0 && (
        <span
          className={cn(
            'font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400',
            sizeClasses
          )}
        >
          +{remainingCount}
        </span>
      )}
    </div>
  )
}
