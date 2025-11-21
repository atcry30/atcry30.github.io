import React from 'react'
import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { formatCurrency } from '../utils/currency'

export default function CartPage() {
  const { items, increase, decrease, remove, total, clear } = useCart()
  const navigate = useNavigate()

  const hasItems = items.length > 0

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">Your Cart</h1>
        <Link to="/collection" className="text-sm text-gold-600 hover:text-gold-500">Continue shopping</Link>
      </div>

      {!hasItems ? (
        <div className="text-center py-20 border border-dashed border-black/10 dark:border-white/10 rounded-xl">
          <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
          <div className="mt-6">
            <Link to="/collection" className="btn-gold px-5 py-2 rounded-lg border border-gold-500/60 inline-block">Browse collection</Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {items.map(it => (
              <div key={it.id} className="flex gap-4 p-4 border border-black/10 dark:border-white/10 rounded-xl">
                <img src={it.image} alt={it.name} className="h-28 w-28 rounded-lg object-cover border border-black/10 dark:border-white/10"/>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{it.name}</p>
                      <p className="text-gold-700 dark:text-gold-500">{formatCurrency(it.price)}</p>
                    </div>
                    <button onClick={() => remove(it.id)} className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Remove</button>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <button onClick={() => decrease(it.id)} className="h-8 w-8 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">-</button>
                    <span className="min-w-[1.5rem] text-center">{it.qty}</span>
                    <button onClick={() => increase(it.id)} className="h-8 w-8 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:col-span-1 p-6 border border-black/10 dark:border-white/10 rounded-xl h-fit">
            <h2 className="font-medium mb-4">Order Summary</h2>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="font-semibold">{formatCurrency(total)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Shipping</span>
              <span className="text-gray-500">Calculated at checkout</span>
            </div>
            <div className="mt-4">
              <button onClick={clear} className="w-full rounded-lg border border-black/15 dark:border-white/15 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition">Clear cart</button>
            </div>
            <div className="mt-3">
              <button onClick={() => navigate('/checkout')} className="w-full rounded-lg border border-gold-500/60 px-4 py-3 text-sm font-medium hover:opacity-90 transition btn-gold">Proceed to checkout</button>
            </div>
          </aside>
        </div>
      )}
    </section>
  )
}


