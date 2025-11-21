import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="bg-white dark:bg-black py-16 md:py-24 border-t border-black/10 dark:border-white/10 transition-colors">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-white transition-colors">About Lunvarre</motion.h2>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">
          At Lunvarre, craftsmanship is a covenant. Each timepiece is meticulously assembled by master watchmakers,
          harmonizing Swiss-inspired precision with contemporary design. From hand-finished indices to calibrated movements,
          our watches embody a quiet power—luxury that whispers. Forged in premium steels and sapphire crystals, every
          Lunvarre watch is engineered to endure generations, preserving your legacy with every second.
        </motion.p>
      </div>
    </section>
  )
}


