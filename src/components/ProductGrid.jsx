import React from 'react'
import { watches } from '../data/watches'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatCurrency } from '../utils/currency'

function ProductCard({ product, onAdd, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: (index || 0) * 0.04, ease: 'easeOut' }}
      className="group rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-transparent backdrop-blur-sm p-4 shadow-soft hover:shadow-xl transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-black/40">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06] group-hover:rotate-[0.2deg]"/>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link to={`/product/${product.id}`} className="block hover:text-gold-500 transition">
            <h3 className="font-serif text-lg text-gray-900 dark:text-white truncate transition-colors">{product.name}</h3>
          </Link>
          <span className="inline-block mt-1 rounded-full border border-gold-500/50 bg-gold-500/15 text-gold-700 dark:text-gold-500 px-2 py-0.5 text-xs font-semibold transition-colors">{formatCurrency(product.price)}</span>
        </div>
        <button onClick={onAdd} className="gold-glow rounded-md border border-gold-500/60 px-3 py-2 text-xs text-gray-900 dark:text-gray-100 hover:text-black transition btn-gold">
          Add to Cart
        </button>
      </div>
    </motion.div>
  )
}

export default function ProductGrid({ productsOverride }) {
  const { add } = useCart()
  return (
    <section id="collection" className="py-16 md:py-24 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 md:mb-14 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-white transition-colors">The Collection</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors">Curated timepieces crafted for the connoisseur.</p>
          </div>
          {!productsOverride && (
            <div>
              <Link to="/collection" className="gold-glow rounded-full border border-gold-500/60 bg-black/40 px-4 py-2 text-sm text-gray-100 hover:text-black hover:bg-gold-500 transition">View full collection</Link>
            </div>
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(productsOverride || watches).map((w, i) => (
            <ProductCard key={w.id} product={w} index={i} onAdd={() => add(w)} />
          ))}
        </div>
      </div>
    </section>
  )
}


