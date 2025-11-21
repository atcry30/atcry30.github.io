import React from 'react'
import { useCart } from '../context/CartContext'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { count, setIsOpen } = useCart()
  const location = useLocation()
  const { theme, toggle } = useTheme()
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60 bg-white/80 dark:bg-black/70 border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-serif text-2xl tracking-wide text-gold-500 hover:text-gold-400 transition">
          <img src="/images/logo.png" alt="Lunvarre Logo" className="h-8 w-8 object-contain" />
          Lunvarre
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" className={(location.pathname==='/'? 'text-gold-600 border-b-2 border-gold-500 pb-1 ':'') + ' hover:text-gold-500 transition'}>Home</Link>
          <Link to="/collection" className={(location.pathname.startsWith('/collection')? 'text-gold-600 border-b-2 border-gold-500 pb-1 ':'') + ' hover:text-gold-500 transition'}>Collection</Link>
          <Link to="/about" className={(location.pathname.startsWith('/about')? 'text-gold-600 border-b-2 border-gold-500 pb-1 ':'') + ' hover:text-gold-500 transition'}>About</Link>
          <Link to="/contact" className={(location.pathname.startsWith('/contact')? 'text-gold-600 border-b-2 border-gold-500 pb-1 ':'') + ' hover:text-gold-500 transition'}>Contact</Link>
          <button onClick={toggle} className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/5 transition" aria-label="Toggle theme">
            {theme === 'dark' ? (
              // Sun icon for light mode
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 3.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V4.5a.75.75 0 01.75-.75zM6.72 5.47a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L6.72 6.53a.75.75 0 010-1.06zM3.75 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H4.5A.75.75 0 013.75 12zm13.97-6.53a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM12 18.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM18.75 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM7.78 16.41a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06L7.78 17.47a.75.75 0 010-1.06zm8.36 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 111.06-1.06zM12 7.5A4.5 4.5 0 1012 16.5 4.5 4.5 0 0012 7.5z"/>
              </svg>
            ) : (
              // Moon icon for dark mode
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M21 12.75A8.25 8.25 0 1111.25 3a.75.75 0 01.87.98 6.75 6.75 0 008.9 8.9.75.75 0 01.98.87z"/>
              </svg>
            )}
          </button>
        </div>
        <button aria-label="Cart" onClick={() => setIsOpen(true)} className="relative gold-glow rounded-full p-2 hover:bg-white/5 transition">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gold-500">
            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386l2.47 10.864a2.25 2.25 0 002.2 1.736h8.768a2.25 2.25 0 002.2-1.736l1.286-5.657a.75.75 0 10-1.46-.332l-1.286 5.657a.75.75 0 01-.74.578H8.306a.75.75 0 01-.74-.578L5.21 4.5h13.54a.75.75 0 000-1.5H2.25z"/>
            <path d="M8.25 20.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          </svg>
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-gold-500 text-black text-xs font-semibold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center">{count}</span>
          )}
        </button>
      </nav>
    </header>
  )
}


