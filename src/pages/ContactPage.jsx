import React from 'react'

export default function ContactPage() {
  return (
    <section className="bg-white dark:bg-black py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-2">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-gold-500">Contact Lunvarre</h1>
          <p className="mt-4 text-gray-700 dark:text-gray-300">We'd love to hear from you. Send us a message and our team will reply.</p>
          <div className="mt-8 space-y-3 text-gray-600 dark:text-gray-400 text-sm">
            <p><span className="text-gray-800 dark:text-gray-200">Email:</span> hello@lunvarre.com</p>
            <p><span className="text-gray-800 dark:text-gray-200">Phone:</span> +1 (000) 000-0000</p>
            <p><span className="text-gray-800 dark:text-gray-200">Hours:</span> Mon–Sat, 10:00–18:00</p>
          </div>
        </div>
        <form className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input type="text" className="w-full rounded-md bg-white dark:bg-black/40 border border-black/15 dark:border-white/15 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-500" placeholder="Your name"/>
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" className="w-full rounded-md bg-white dark:bg-black/40 border border-black/15 dark:border-white/15 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-500" placeholder="you@example.com"/>
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea rows="5" className="w-full rounded-md bg-white dark:bg-black/40 border border-black/15 dark:border-white/15 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-500" placeholder="How can we help?"/>
          </div>
          <button type="button" className="rounded-lg border border-gold-500/60 px-5 py-2.5 font-medium gold-glow hover:opacity-90 transition btn-gold">Send message</button>
        </form>
      </div>
    </section>
  )
}


