import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-12', className)}>
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-3">
        {title}
      </h1>
      {description && (
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}
