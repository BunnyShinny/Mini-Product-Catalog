import './globals.css'
import Link from 'next/link'
import Header from '../components/Header' 

export const metadata = {
  title: 'My Website',
  description: 'Created with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <Header />
        <main className="min-h-screen px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}



function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-4">
      &copy; {new Date().getFullYear()} My Website. All rights reserved.
    </footer>
  )
}
