import React, { useEffect, useMemo, useState } from 'react'
import { watches } from '../data/watches'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/currency'
import { motion, AnimatePresence } from 'framer-motion'

function getSeriesName(productName) {
  const parts = productName.split(' - ')
  if (parts.length > 1) {
    return parts[0]
  }
  return productName
}

function getAllSeries(products) {
  const seriesSet = new Set()
  products.forEach(product => {
    seriesSet.add(getSeriesName(product.name))
  })
  return Array.from(seriesSet).sort()
}

function getGender(imagePath) {
  if (imagePath.includes('/Men/')) return 'Men'
  if (imagePath.includes('/Women/')) return 'Women'
  if (imagePath.includes('/Kids/')) return 'Kids'
  if (imagePath.includes('/Unisex/')) return 'Unisex'
  return 'All'
}

const priceOptions = [
  { value: 'all', label: 'All Prices', min: 0, max: Number.POSITIVE_INFINITY },
  { value: 'under-10000', label: '₱0 – ₱9,999', min: 0, max: 9999 },
  { value: '10000-14999', label: '₱10,000 – ₱14,999', min: 10000, max: 14999 },
  { value: '15000-plus', label: '₱15,000+', min: 15000, max: Number.POSITIVE_INFINITY }
]

function ProductCard({ product, onAdd, index }) {
  const seriesName = getSeriesName(product.name)
  const displayName = product.name.includes(' - ') 
    ? product.name.split(' - ')[1] 
    : product.name

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
          <h3 className="font-serif text-lg font-medium text-gray-900 dark:text-white line-clamp-2 group-hover/link:text-gold-500 transition-colors duration-200">
            {displayName}
          </h3>
        </Link>
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-700 dark:text-gold-400 px-3 py-1.5 text-sm font-semibold">
            {formatCurrency(product.price)}
          </span>
          <button 
            onClick={onAdd} 
            className="flex-shrink-0 w-11 h-11 rounded-xl border-2 border-gold-500/40 bg-gold-500/10 hover:bg-gold-500 hover:border-gold-500 dark:bg-gold-500/5 dark:hover:bg-gold-500/20 flex items-center justify-center text-gold-600 dark:text-gold-400 hover:text-white dark:hover:text-gold-500 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
            aria-label="Add to cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function CollectionPage() {
  const { add } = useCart()
  const categories = useMemo(() => {
    const set = new Set(watches.map(w => w.category))
    return ['All', ...Array.from(set).sort()]
  }, [])

  const allSeries = useMemo(() => {
    return getAllSeries(watches)
  }, [])

  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeSeries, setActiveSeries] = useState('All')
  const [activeGender, setActiveGender] = useState('All')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [seriesDropdownOpen, setSeriesDropdownOpen] = useState(false)
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false)
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  
  const itemsPerPage = 12

  useEffect(() => {
    const qp = searchParams.get('category')
    if (qp && categories.includes(qp)) {
      setActiveCategory(qp)
    } else if (qp === 'All') {
      setActiveCategory('All')
    }
  }, [searchParams, categories])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.filter-dropdown')) {
        setCategoryDropdownOpen(false)
        setSeriesDropdownOpen(false)
        setGenderDropdownOpen(false)
        setPriceDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = useMemo(() => {
    let products = activeCategory === 'All' ? watches : watches.filter(w => w.category === activeCategory)
    
    if (activeGender !== 'All') {
      products = products.filter(product => getGender(product.image) === activeGender)
    }
    
    if (activeSeries !== 'All') {
      products = products.filter(product => getSeriesName(product.name) === activeSeries)
    }

    if (priceRange !== 'all') {
      const selectedRange = priceOptions.find(option => option.value === priceRange)
      if (selectedRange) {
        products = products.filter(
          product => product.price >= selectedRange.min && product.price <= selectedRange.max
        )
      }
    }
    
    if (sortBy === 'price-low') {
      products = [...products].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      products = [...products].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      products = [...products].sort((a, b) => a.name.localeCompare(b.name))
    }
    
    return products
  }, [activeCategory, activeGender, activeSeries, priceRange, sortBy])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, activeGender, activeSeries, priceRange, sortBy])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filtered.slice(startIndex, endIndex)
  const activePriceOption = priceOptions.find(option => option.value === priceRange) ?? priceOptions[0]

  return (
    <section className="bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-black dark:via-gray-950/50 dark:to-black py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-2">
            Our Collections
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Browse by category.
          </p>
        </div>
        
        <div className="mb-10 flex flex-wrap items-center gap-3 pb-6 border-b border-gray-200/40 dark:border-gray-800/40">
          <div className="relative filter-dropdown">
            <button
              onClick={() => {
                setGenderDropdownOpen(!genderDropdownOpen)
                setCategoryDropdownOpen(false)
                setSeriesDropdownOpen(false)
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300/60 dark:border-gray-700/60 bg-white dark:bg-gray-900/50 hover:border-gold-500/50 dark:hover:border-gold-500/50 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[120px] justify-between"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className={activeGender === 'All' ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}>
                  {activeGender === 'All' ? 'Gender' : activeGender}
                </span>
              </span>
              <svg 
                className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${genderDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {genderDropdownOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setGenderDropdownOpen(false)}
                    className="fixed inset-0 z-10"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl border border-gray-200/60 dark:border-gray-800/60 shadow-xl z-20 overflow-hidden"
                  >
                    <div className="p-2">
                      {['All', 'Men', 'Women', 'Kids', 'Unisex'].map(gender => (
                        <button
                          key={gender}
                          onClick={() => {
                            setActiveGender(gender)
                            setGenderDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            activeGender === gender
                              ? 'bg-gold-500/10 text-gold-700 dark:text-gold-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                          }`}
                        >
                          {gender}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="relative filter-dropdown">
            <button
              onClick={() => {
                setCategoryDropdownOpen(!categoryDropdownOpen)
                setSeriesDropdownOpen(false)
                setGenderDropdownOpen(false)
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300/60 dark:border-gray-700/60 bg-white dark:bg-gray-900/50 hover:border-gold-500/50 dark:hover:border-gold-500/50 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[140px] justify-between"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className={activeCategory === 'All' ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}>
                  {activeCategory === 'All' ? 'Category' : activeCategory}
                </span>
              </span>
              <svg 
                className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {categoryDropdownOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setCategoryDropdownOpen(false)}
                    className="fixed inset-0 z-10"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl border border-gray-200/60 dark:border-gray-800/60 shadow-xl z-20 overflow-hidden"
                  >
                    <div className="p-2">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveCategory(cat)
                            setCategoryDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            activeCategory === cat
                              ? 'bg-gold-500/10 text-gold-700 dark:text-gold-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="relative filter-dropdown">
            <button
              onClick={() => {
                setSeriesDropdownOpen(!seriesDropdownOpen)
                setCategoryDropdownOpen(false)
                setGenderDropdownOpen(false)
                setPriceDropdownOpen(false)
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300/60 dark:border-gray-700/60 bg-white dark:bg-gray-900/50 hover:border-gold-500/50 dark:hover:border-gold-500/50 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[160px] justify-between"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className={activeSeries === 'All' ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}>
                  {activeSeries === 'All' ? 'Series' : activeSeries}
                </span>
              </span>
              <svg 
                className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${seriesDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {seriesDropdownOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSeriesDropdownOpen(false)}
                    className="fixed inset-0 z-10"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl border border-gray-200/60 dark:border-gray-800/60 shadow-xl z-20 overflow-hidden max-h-[400px] overflow-y-auto"
                  >
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setActiveSeries('All')
                          setSeriesDropdownOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeSeries === 'All'
                            ? 'bg-gold-500/10 text-gold-700 dark:text-gold-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                        }`}
                      >
                        All Series
                      </button>
                      {allSeries.map(series => (
                        <button
                          key={series}
                          onClick={() => {
                            setActiveSeries(series)
                            setSeriesDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            activeSeries === series
                              ? 'bg-gold-500/10 text-gold-700 dark:text-gold-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                          }`}
                        >
                          {series}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="relative filter-dropdown">
            <button
              onClick={() => {
                setPriceDropdownOpen(!priceDropdownOpen)
                setGenderDropdownOpen(false)
                setCategoryDropdownOpen(false)
                setSeriesDropdownOpen(false)
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300/60 dark:border-gray-700/60 bg-white dark:bg-gray-900/50 hover:border-gold-500/50 dark:hover:border-gold-500/50 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[150px] justify-between"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4-1.343-4-3s1.79-3 4-3 4 1.343 4 3-1.79 3-4 3zm0 0v13m0 0c-2.21 0-4 1.343-4 3s1.79 3 4 3 4-1.343 4-3-1.79-3-4-3z" />
                </svg>
                <span className={priceRange === 'all' ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}>
                  {priceRange === 'all' ? 'Price' : activePriceOption.label}
                </span>
              </span>
              <svg 
                className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${priceDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {priceDropdownOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setPriceDropdownOpen(false)}
                    className="fixed inset-0 z-10"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-60 bg-white dark:bg-gray-900 rounded-xl border border-gray-200/60 dark:border-gray-800/60 shadow-xl z-20 overflow-hidden"
                  >
                    <div className="p-2">
                      {priceOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setPriceRange(option.value)
                            setPriceDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            priceRange === option.value
                              ? 'bg-gold-500/10 text-gold-700 dark:text-gold-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
              {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
              {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
            </span>
            {(activeCategory !== 'All' || activeGender !== 'All' || activeSeries !== 'All' || priceRange !== 'all') && (
              <button
                onClick={() => {
                  setActiveCategory('All')
                  setActiveGender('All')
                  setActiveSeries('All')
                  setPriceRange('all')
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            )}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-lg border border-gray-300/60 dark:border-gray-700/60 bg-white dark:bg-gray-900/50 text-gray-800 dark:text-gray-200 px-4 py-2.5 pr-8 text-sm font-medium hover:border-gold-500/50 dark:hover:border-gold-500/50 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              >
                <option value="default">Sort</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div>
            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <>
                  <motion.div
                    key={`products-${currentPage}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  >
                    {paginatedProducts.map((product, index) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAdd={() => add(product)} 
                        index={index}
                      />
                    ))}
                  </motion.div>
                  
                  {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg border border-gray-300/60 dark:border-gray-700/60 bg-white dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-gold-500/50 dark:hover:border-gold-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                                  currentPage === page
                                    ? 'bg-gold-500 text-black'
                                    : 'border border-gray-300/60 dark:border-gray-700/60 bg-white dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 hover:border-gold-500/50 dark:hover:border-gold-500/50'
                                }`}
                              >
                                {page}
                              </button>
                            )
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <span key={page} className="px-2 text-gray-500 dark:text-gray-400">
                                ...
                              </span>
                            )
                          }
                          return null
                        })}
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg border border-gray-300/60 dark:border-gray-700/60 bg-white dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-gold-500/50 dark:hover:border-gold-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        Next
                        <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Try adjusting your filters to see more results.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
