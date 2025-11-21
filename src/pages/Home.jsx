import React, { useMemo } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import { watches } from '../data/watches'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatCurrency } from '../utils/currency'

function getSeriesName(productName) {
  const parts = productName.split(' - ')
  if (parts.length > 1) {
    return parts[0]
  }
  return productName
}

function ProductCard({ product, index }) {
  const seriesName = getSeriesName(product.name)
  const displayName = product.name.includes(' - ') 
    ? product.name.split(' - ')[1] 
    : product.name

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-900/50 backdrop-blur-sm p-5 shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 mb-4 relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50">
              {seriesName}
            </span>
          </div>
        </div>
      </Link>
      <div className="space-y-3">
        <Link to={`/product/${product.id}`} className="block group/link">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-serif text-lg font-medium text-gray-900 dark:text-white line-clamp-2 group-hover/link:text-gold-500 transition-colors duration-200 flex-1">
              {displayName}
            </h3>
            <span className="inline-flex items-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-700 dark:text-gold-400 px-3 py-1.5 text-sm font-semibold flex-shrink-0">
              {formatCurrency(product.price)}
            </span>
          </div>
        </Link>
      </div>
    </motion.div>
  )
}

function FeaturedProducts() {
  const featuredProducts = useMemo(() => {
    const categories = ['Diver', 'Dress', 'Classic', 'Smartwatch', 'Kids']
    const featured = []
    
    categories.forEach(category => {
      const categoryWatches = watches.filter(w => w.category === category)
      if (categoryWatches.length > 0) {
        featured.push(categoryWatches[Math.floor(Math.random() * categoryWatches.length)])
      }
    })
    
    const remaining = 8 - featured.length
    const available = watches.filter(w => !featured.find(f => f.id === w.id))
    for (let i = 0; i < remaining && i < available.length; i++) {
      featured.push(available[Math.floor(Math.random() * available.length)])
    }
    
    return featured.slice(0, 8)
  }, [])

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-black dark:via-gray-950/50 dark:to-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-14 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-2">
              Featured Collection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Curated timepieces crafted for the connoisseur.
            </p>
          </div>
          <Link 
            to="/collection" 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300/60 dark:border-gray-700/60 bg-white dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-gold-500/50 dark:hover:border-gold-500/50 transition"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoriesShowcase() {
  const categories = useMemo(() => {
    const categorySet = new Set(watches.map(w => w.category))
    return Array.from(categorySet).filter(cat => cat !== 'Kids').sort()
  }, [])

  const categoryInfo = {
    'Diver': { description: 'Professional diving timepieces' },
    'Dress': { description: 'Elegant formal watches' },
    'Classic': { description: 'Timeless sophistication' },
    'Skeleton': { description: 'Mechanical artistry' },
    'Smartwatch': { description: 'Technology meets luxury' },
    'Kids': { description: 'Fun & durable designs' }
  }

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black border-t border-gray-200/40 dark:border-gray-800/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Explore our diverse collection of timepieces.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-stretch gap-4 md:gap-6">
          {categories.map((category, index) => {
            const info = categoryInfo[category] || { description: 'Premium timepieces' }
            const categoryWatches = watches.filter(w => w.category === category)
            const sampleWatch = categoryWatches[0]
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="w-[160px] sm:w-[180px] md:w-[200px] h-full"
              >
                <Link
                  to={`/collection?category=${category}`}
                  className="group flex flex-col h-full rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-900/50 backdrop-blur-sm p-4 md:p-5 hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 mb-3 md:mb-4 relative flex-shrink-0">
                    {sampleWatch && (
                      <img 
                        src={sampleWatch.image} 
                        alt={category} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-serif text-base md:text-lg font-medium text-gray-900 dark:text-white mb-1.5 group-hover:text-gold-500 transition-colors text-center">
                        {category}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1.5 text-center line-clamp-2 min-h-[2.5rem]">
                        {info.description}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-auto">
                      {categoryWatches.length} {categoryWatches.length === 1 ? 'watch' : 'watches'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoriesShowcase />
      <About />
    </>
  )
}


