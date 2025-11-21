import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'lunvarre_cart_v1'

export function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const total = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items])
  const count = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items])

  const add = (product) => {
    setItems(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setIsOpen(true)
  }

  const remove = (id) => setItems(prev => prev.filter(p => p.id !== id))
  const decrease = (id) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p))
  const increase = (id) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty: p.qty + 1 } : p))
  const clear = () => setItems([])

  return (
    <CartContext.Provider value={{ isOpen, setIsOpen, items, add, remove, decrease, increase, clear, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


