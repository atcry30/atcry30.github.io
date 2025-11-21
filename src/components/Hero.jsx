import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section id="home" className="relative isolate">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="h-[78vh] md:h-[86vh] w-full relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img 
            src="/images/hero.gif" 
            alt="Hero" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative h-full w-full">
          <div className="mx-auto max-w-7xl px-6 h-full flex items-center">
            <div className="max-w-2xl animate-[fadeIn_1.2s_ease-out]">
              <h1 className="font-serif text-4xl md:text-6xl font-semibold text-white leading-tight">
                Timeless Precision. <span className="text-gold-500">Eternal Elegance.</span>
              </h1>
              <p className="mt-4 text-gray-300 text-base md:text-lg">
                Discover handcrafted watches that define sophistication.
              </p>
              <div className="mt-8">
                <Link to="/collection" className="inline-block gold-glow rounded-full border border-gold-500/60 px-6 py-3 text-sm md:text-base text-gray-900 dark:text-gray-100 hover:text-black transition btn-gold">
                  Explore Collection
                </Link>
              </div>
              <p className="mt-3 text-sm text-gray-400 italic">Where Every Second Speaks Luxury.</p>
            </div>
          </div>
        </div>
      </motion.div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px);} to { opacity: 1; transform: translateY(0);} }`}</style>
    </section>
  )
}


