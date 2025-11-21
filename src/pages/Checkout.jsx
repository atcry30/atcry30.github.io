import React, { useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../utils/currency'

const required = (v) => (v && String(v).trim().length > 0)

export default function Checkout() {
  const { items, total, clear } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  const [shipping, setShipping] = useState({
    fullName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    region: '',
    postal: ''
  })
  const [payment, setPayment] = useState({ method: 'cod', cardName: '', cardNumber: '', expiry: '', cvc: '' })

  const shippingValid = useMemo(() => (
    required(shipping.fullName) &&
    required(shipping.email) &&
    required(shipping.phone) &&
    required(shipping.address1) &&
    required(shipping.city) &&
    required(shipping.region) &&
    required(shipping.postal)
  ), [shipping])

  const cardValid = useMemo(() => (
    payment.method !== 'card' || (
      required(payment.cardName) && required(payment.cardNumber) && required(payment.expiry) && required(payment.cvc)
    )
  ), [payment])

  const shippingFee = useMemo(() => (items.length > 0 ? 2500 : 0), [items])
  const grandTotal = useMemo(() => total + shippingFee, [total, shippingFee])

  const autofillDemo = () => {
    setShipping({
      fullName: 'Nadia Cruz',
      email: 'nadia@gmail.com',
      phone: '+63 917 000 0000',
      address1: '123 Nadia Street',
      address2: 'Barangay Shih Tzu',
      city: 'Malolos',
      region: 'Bulacan',
      postal: '3000'
    })
    setPayment({
      method: 'card',
      cardName: 'Nadia Cruz',
      cardNumber: '4111 1111 1111 1111',
      expiry: '12/28',
      cvc: '123'
    })
  }

  const placeOrder = () => {
    const orderId = 'LV-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    const order = {
      id: orderId,
      items,
      total: grandTotal,
      shipping,
      payment: { ...payment, cardNumber: payment.cardNumber ? '•••• •••• •••• ' + payment.cardNumber.slice(-4) : '' },
      placedAt: new Date().toISOString()
    }
    try {
      sessionStorage.setItem('lunvarre_last_order', JSON.stringify(order))
    } catch {}
    clear()
    navigate('/order-success')
  }

  if (items.length === 0 && step !== 3) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-gray-600 dark:text-gray-400">Your cart is empty. Add items to proceed to checkout.</p>
      </section>
    )
  }

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <button
        type="button"
        onClick={autofillDemo}
        className="fixed bottom-6 right-6 h-10 w-10 rounded-full bg-gold-500/80 text-transparent hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400"
        aria-label="Autofill demo details"
      />
      <div className="mb-8">
        <h1 className="font-serif text-3xl">Checkout</h1>
        <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <StepIndicator label="Shipping" active={step===1} done={step>1} />
          <StepIndicator label="Payment" active={step===2} done={step>2} />
          <StepIndicator label="Review" active={step===3} done={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {step === 1 && (
            <Card title="Shipping information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField label="Full name" value={shipping.fullName} onChange={v => setShipping({ ...shipping, fullName: v })} required />
                <TextField label="Email" type="email" value={shipping.email} onChange={v => setShipping({ ...shipping, email: v })} required />
                <TextField label="Phone" value={shipping.phone} onChange={v => setShipping({ ...shipping, phone: v })} required />
                <div />
                <TextField label="Address line 1" value={shipping.address1} onChange={v => setShipping({ ...shipping, address1: v })} required />
                <TextField label="Address line 2" value={shipping.address2} onChange={v => setShipping({ ...shipping, address2: v })} />
                <TextField label="City" value={shipping.city} onChange={v => setShipping({ ...shipping, city: v })} required />
                <TextField label="Region/Province" value={shipping.region} onChange={v => setShipping({ ...shipping, region: v })} required />
                <TextField label="Postal code" value={shipping.postal} onChange={v => setShipping({ ...shipping, postal: v })} required />
              </div>
              <div className="mt-6 flex justify-end">
                <button disabled={!shippingValid} onClick={() => setStep(2)} className={`rounded-lg px-5 py-2 text-sm font-medium border ${shippingValid ? 'btn-gold border-gold-500/60' : 'cursor-not-allowed opacity-60 border-black/10 dark:border-white/10'}`}>Continue to payment</button>
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card title="Payment">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Radio value="cod" checked={payment.method==='cod'} onChange={() => setPayment({ ...payment, method: 'cod' })} label="Cash on Delivery (COD)" />
                  <Radio value="card" checked={payment.method==='card'} onChange={() => setPayment({ ...payment, method: 'card' })} label="Credit/Debit Card" />
                  <Radio value="gcash" checked={payment.method==='gcash'} onChange={() => setPayment({ ...payment, method: 'gcash' })} label="GCash" />
                </div>
                {payment.method === 'card' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField label="Name on card" value={payment.cardName} onChange={v => setPayment({ ...payment, cardName: v })} required />
                    <TextField label="Card number" value={payment.cardNumber} onChange={v => setPayment({ ...payment, cardNumber: v })} required placeholder="4111 1111 1111 1111" />
                    <TextField label="Expiry" value={payment.expiry} onChange={v => setPayment({ ...payment, expiry: v })} required placeholder="MM/YY" />
                    <TextField label="CVC" value={payment.cvc} onChange={v => setPayment({ ...payment, cvc: v })} required />
                  </div>
                )}
                {payment.method === 'gcash' && (
                  <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 text-sm text-gray-600 dark:text-gray-400">You will be redirected to a mock GCash step — for demo only.</div>
                )}
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(1)} className="rounded-lg px-5 py-2 text-sm border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">Back</button>
                <button disabled={!cardValid} onClick={() => setStep(3)} className={`rounded-lg px-5 py-2 text-sm font-medium border ${cardValid ? 'btn-gold border-gold-500/60' : 'cursor-not-allowed opacity-60 border-black/10 dark:border-white/10'}`}>Review order</button>
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card title="Review order">
              <div className="space-y-4">
                <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
                  <h3 className="font-medium mb-2">Shipping to</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{shipping.fullName}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{shipping.address1}{shipping.address2 ? ', ' + shipping.address2 : ''}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{shipping.city}, {shipping.region} {shipping.postal}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{shipping.email} · {shipping.phone}</p>
                </div>
                <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
                  <h3 className="font-medium mb-2">Payment</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 uppercase">{payment.method}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(2)} className="rounded-lg px-5 py-2 text-sm border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">Back</button>
                <button onClick={placeOrder} className="rounded-lg px-5 py-2 text-sm font-medium border border-gold-500/60 btn-gold">Place order</button>
              </div>
            </Card>
          )}
        </div>

        <aside className="lg:col-span-1 p-6 border border-black/10 dark:border-white/10 rounded-xl h-fit">
          <h2 className="font-medium mb-4">Order Summary</h2>
          <ul className="space-y-3 mb-4 max-h-64 overflow-auto pr-1">
            {items.map(it => (
              <li key={it.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">{it.name} × {it.qty}</span>
                <span className="font-semibold">{formatCurrency(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="font-semibold">{formatCurrency(total)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
            <span className="font-semibold">{formatCurrency(shippingFee)}</span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-medium">Total</span>
            <span className="font-semibold text-lg">{formatCurrency(grandTotal)}</span>
          </div>
        </aside>
      </div>
    </section>
  )
}

function Card({ title, children }) {
  return (
    <div className="p-6 border border-black/10 dark:border-white/10 rounded-xl">
      <h2 className="font-medium mb-4">{title}</h2>
      {children}
    </div>
  )
}

function TextField({ label, value, onChange, type = 'text', placeholder = '', required = false }) {
  return (
    <label className="block">
      <span className="block text-sm text-gray-700 dark:text-gray-300 mb-1">{label}{required && <span className="text-red-500"> *</span>}</span>
      <input
        className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
      />
    </label>
  )
}

function Radio({ value, checked, onChange, label }) {
  return (
    <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${checked ? 'border-gold-500 text-gold-600' : 'border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300'}`}>
      <input type="radio" className="hidden" value={value} checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  )
}

function StepIndicator({ label, active, done }) {
  return (
    <div className={`flex items-center justify-center gap-2 py-2 rounded-lg border ${active ? 'border-gold-500 text-gold-600' : 'border-black/10 dark:border-white/10'} ${done ? 'opacity-70' : ''}`}>
      <span className="text-sm">{label}</span>
    </div>
  )
}


