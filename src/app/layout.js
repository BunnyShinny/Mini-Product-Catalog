import './globals.css'
import Link from 'next/link'
import Header from '../components/Header' 
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: 'My Website',
  description: 'Created with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <CartProvider>
          <Header />
            <main className="min-h-screen px-4 py-6">{children}</main>
            <Toaster position="top-right" />
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}



function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-4">
      &copy; {new Date().getFullYear()} Mini Product Catalog. All rights reserved.
    </footer>
  )
}
