import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { watches } from '../data/watches'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/currency'

function getSeriesName(productName) {
  const parts = productName.split(' - ')
  if (parts.length > 1) {
    return parts[0]
  }
  return productName
}

function getGender(imagePath) {
  if (imagePath.includes('/Men/')) return 'Men'
  if (imagePath.includes('/Women/')) return 'Women'
  if (imagePath.includes('/Kids/')) return 'Kids'
  if (imagePath.includes('/Unisex/')) return 'Unisex'
  return 'All'
}

export default function ProductDetails() {
  const { id } = useParams()
  const { add } = useCart()
  const product = useMemo(() => watches.find(w => w.id === id), [id])
  
  const recommended = useMemo(() => {
    if (!product) return []
    
    const productSeries = getSeriesName(product.name)
    const productCategory = product.category
    const productGender = getGender(product.image)
    
    let related = watches.filter(w => 
      w.id !== id && getSeriesName(w.name) === productSeries
    )
    
    if (related.length < 4) {
      const sameCategory = watches.filter(w => 
        w.id !== id && 
        w.category === productCategory && 
        !related.find(r => r.id === w.id)
      )
      related = [...related, ...sameCategory]
    }
    
    if (related.length < 4) {
      const sameGender = watches.filter(w => 
        w.id !== id && 
        getGender(w.image) === productGender && 
        !related.find(r => r.id === w.id)
      )
      related = [...related, ...sameGender]
    }
    
    if (related.length < 4) {
      const others = watches.filter(w => 
        w.id !== id && 
        !related.find(r => r.id === w.id)
      )
      related = [...related, ...others]
    }
    
    return related.slice(0, 4)
  }, [id, product])

  if (!product) {
    return (
      <section className="bg-white dark:bg-black min-h-[60vh] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-gray-600 dark:text-gray-300">Product not found.</p>
          <Link to="/" className="text-gold-500 hover:text-gold-400 hover:underline transition">Back to collection</Link>
        </div>
      </section>
    )
  }

  const msrp = Math.round(product.price * 1.25)

  const getProductDescription = () => {
    const category = product.category
    const name = product.name.toLowerCase()
    
    if (category === 'Diver') {
      return 'A professional diving timepiece engineered for underwater exploration. Features robust construction with enhanced water resistance, unidirectional rotating bezel, and luminous markers for optimal visibility in low-light conditions. Built to withstand the rigors of aquatic adventures while maintaining elegant sophistication.'
    } else if (category === 'Dress') {
      return 'An elegant dress watch designed for formal occasions and sophisticated style. Crafted with refined aesthetics, slim profile, and premium materials. Perfect for complementing business attire and evening wear with timeless elegance and understated luxury.'
    } else if (category === 'Skeleton') {
      return 'A mesmerizing skeleton watch showcasing the intricate mechanical movement through an open-worked dial. Witness the artistry of horology as gears, springs, and escapements are beautifully displayed. A statement piece for watch enthusiasts who appreciate mechanical craftsmanship.'
    } else if (category === 'Smartwatch') {
      return 'A modern smartwatch combining traditional watchmaking aesthetics with cutting-edge technology. Seamlessly integrates connectivity, fitness tracking, and smart notifications while maintaining the refined appearance of a luxury timepiece. The perfect fusion of heritage and innovation.'
    } else if (category === 'Kids') {
      return 'A fun and durable watch designed specifically for young adventurers. Features vibrant colors, playful designs, and robust construction to withstand active play. Water-resistant and built to last, making it the perfect first timepiece for children.'
    } else if (name.includes('regalia') || name.includes('lumina')) {
      return 'A prestigious timepiece representing the pinnacle of watchmaking excellence. Meticulously crafted with premium materials and exceptional attention to detail. A statement of refined taste and appreciation for horological artistry.'
    } else if (name.includes('regalvanguard')) {
      return 'A sporty yet sophisticated timepiece designed for active lifestyles. Combines athletic functionality with elegant design, featuring enhanced durability and performance-oriented features. Perfect for those who demand both style and substance.'
    } else if (name.includes('celeste') || name.includes('étoile')) {
      return 'A feminine timepiece celebrating elegance and grace. Delicately designed with attention to aesthetic beauty, featuring refined details and sophisticated styling. Perfect for the modern woman who appreciates timeless elegance.'
    } else if (name.includes('cosmic') || name.includes('stardust')) {
      return 'An imaginative timepiece inspired by the cosmos, featuring vibrant colors and playful designs. Created to spark wonder and adventure in young minds while maintaining quality craftsmanship. A magical companion for everyday adventures.'
    } else {
      return 'A meticulously crafted timepiece that embodies precision engineering and timeless design. Features premium materials, exceptional craftsmanship, and attention to detail. Built for those who appreciate the art of fine watchmaking and seek a timepiece that reflects their refined taste.'
    }
  }

  return (
    <section className="bg-gradient-to-b from-white via-white to-gray-50 dark:from-black dark:via-black dark:to-gray-900 min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
        <nav className="mb-12">
          <div className="flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.32em] text-gray-500 dark:text-gray-500">
            <Link to="/" className="hover:text-gold-500 transition">Home</Link>
            <span>/</span>
            <Link to="/collection" className="hover:text-gold-500 transition">Collection</Link>
            <span>/</span>
            <span className="text-gray-700 dark:text-gray-300">{product.name}</span>
          </div>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="relative">
            <div className="sticky top-24">
              <div className="relative group">
                <div className="aspect-square flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_32px_65px_rgba(0,0,0,0.32)] transition-transform duration-[900ms] ease-[cubic-bezier(.21,.68,.18,1.02)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="absolute -top-12 left-0">
                  <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.42em] text-gray-500 dark:text-gray-400">
                    <span className="block h-px w-8 bg-gold-500" />
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h1 className="font-serif text-4xl md:text-[3.25rem] leading-[1.1] text-gray-900 dark:text-white">
                  {product.name}
                </h1>
                <p className="mt-3 text-sm uppercase tracking-[0.32em] text-gray-400">Timeless Mechanical Mastery</p>
              </div>

              <div>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-serif text-gold-500">{formatCurrency(product.price)}</span>
                  <span className="text-sm text-gray-400 line-through">{formatCurrency(msrp)}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Inclusive of all taxes & complimentary white-glove delivery</p>
              </div>

              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {getProductDescription()}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 pt-3">
                <button
                  onClick={() => add(product)}
                  className="flex-1 rounded-full bg-gold-500 text-black px-8 py-4 text-sm font-semibold tracking-[0.24em] uppercase hover:bg-gold-400 transition-all duration-300"
                >
                  Add to Cart
                </button>
                <Link
                  to="/collection"
                  className="flex-1 rounded-full border border-gray-300 dark:border-gray-700 px-8 py-4 text-center text-sm font-medium uppercase tracking-[0.22em] text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Complimentary worldwide shipping</li>
                  <li>• 30-day atelier returns & concierge support</li>
                  <li>• Certified authenticity & lifetime servicing program</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {recommended.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-gray-900 dark:text-white">Similar Creations</h2>
              <Link to="/collection" className="text-sm text-gold-600 hover:text-gold-500 tracking-[0.24em] uppercase">View All</Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recommended.map(item => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="group rounded-2xl border border-gray-200/60 dark:border-white/5 bg-white/80 dark:bg-black/40 backdrop-blur-sm p-5 hover:-translate-y-1 hover:shadow-xl transition duration-300"
                >
                  <div className="aspect-square rounded-xl bg-black/5 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="mt-4">
                    <p className="font-serif text-lg text-gray-900 dark:text-white">{item.name}</p>
                    <p className="mt-1 text-sm text-gold-600">{formatCurrency(item.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  )
}


