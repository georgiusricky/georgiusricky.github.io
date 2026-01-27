export default function Footer() {
  return (
    <footer className="bg-black dark:bg-white text-white dark:text-black py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Ricky. All rights reserved.</p>
      </div>
    </footer>
  )
}
