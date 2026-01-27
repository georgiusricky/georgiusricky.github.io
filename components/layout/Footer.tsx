export default function Footer() {
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Ricky. All rights reserved.</p>
      </div>
    </footer>
  )
}
