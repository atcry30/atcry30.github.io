import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-black/10 dark:border-white/10" id="contact">
      <div className="mx-auto max-w-3xl px-6 py-12 text-center space-y-4">
        <h3 className="font-serif text-3xl tracking-wide text-gold-500">Lunvarre</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm uppercase tracking-[0.3em]">Timeless precision</p>
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} Lunvarre. All rights reserved.</p>
      </div>
    </footer>
  )
}


