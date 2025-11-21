import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import { CartProvider } from './context/CartContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ProductDetails from './pages/ProductDetails'
import CollectionPage from './pages/CollectionPage'
import ContactPage from './pages/ContactPage'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors duration-300">
          <Navbar />
          <ScrollToTop />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
          </main>
          <Footer />
          <CartSidebar />
        </div>
      </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}


