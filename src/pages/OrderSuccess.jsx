import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/currency'

export default function OrderSuccess() {
  const order = useMemo(() => {
    try {
      const raw = sessionStorage.getItem('lunvarre_last_order')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }, [])

  if (!order) {
    return (
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-serif text-3xl mb-3">Order placed</h1>
        <p className="text-gray-600 dark:text-gray-400">We couldn't load your recent order details, but it's all set.</p>
        <div className="mt-8">
          <Link to="/collection" className="btn-gold px-5 py-2 rounded-lg border border-gold-500/60 inline-block">Continue shopping</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <div className="mx-auto h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-green-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="font-serif text-3xl mt-4">Thank you for your order</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Order <span className="font-medium">{order.id}</span> is confirmed.</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 border border-black/10 dark:border-white/10 rounded-xl">
          <h2 className="font-medium mb-2">Items</h2>
          <ul className="space-y-2 text-sm">
            {order.items.map(it => (
              <li key={it.id} className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">{it.name} × {it.qty}</span>
                <span className="font-semibold">{formatCurrency(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-medium">Total paid</span>
            <span className="font-semibold text-lg">{formatCurrency(order.total)}</span>
          </div>
        </div>

        <div className="p-6 border border-black/10 dark:border-white/10 rounded-xl">
          <h2 className="font-medium mb-2">Shipping to</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">{order.shipping.fullName}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{order.shipping.address1}{order.shipping.address2 ? ', ' + order.shipping.address2 : ''}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{order.shipping.city}, {order.shipping.region} {order.shipping.postal}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{order.shipping.email} · {order.shipping.phone}</p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link to="/collection" className="btn-gold px-5 py-2 rounded-lg border border-gold-500/60 inline-block">Continue shopping</Link>
      </div>
    </section>
  )
}


