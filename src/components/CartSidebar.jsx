import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../utils/currency'

export default function CartSidebar() {
  const { isOpen, setIsOpen, items, increase, decrease, remove, total, clear } = useCart()
  const navigate = useNavigate()
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-black/60 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsOpen(false)} />
      {/* Panel */}
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-black border-l border-black/10 dark:border-white/10 shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10">
            <h3 className="font-serif text-xl text-gray-900 dark:text-white">Your Cart</h3>
            <button onClick={() => setIsOpen(false)} className="rounded-md p-2 hover:bg-white/5 transition" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {items.map(it => (
                  <li key={it.id} className="flex gap-3">
                    <img src={it.image} alt={it.name} className="h-20 w-20 rounded-md object-cover border border-black/10 dark:border-white/10"/>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">{it.name}</p>
                          <p className="text-gold-700 dark:text-gold-500 text-sm">{formatCurrency(it.price)}</p>
                        </div>
                        <button onClick={() => remove(it.id)} className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Remove</button>
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2">
                        <button onClick={() => decrease(it.id)} className="h-7 w-7 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">-</button>
                        <span className="min-w-[1.5rem] text-center">{it.qty}</span>
                        <button onClick={() => increase(it.id)} className="h-7 w-7 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">+</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t border-black/10 dark:border-white/10 px-6 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-400">Total</span>
              <span className="text-gray-900 dark:text-white font-semibold">{formatCurrency(total)}</span>
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={clear} className="flex-1 rounded-lg border border-black/15 dark:border-white/15 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition">Clear</button>
              <button onClick={() => { setIsOpen(false); navigate('/checkout') }} className="flex-1 rounded-lg border border-gold-500/60 px-4 py-2 text-sm font-medium hover:opacity-90 transition btn-gold">Checkout</button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}


