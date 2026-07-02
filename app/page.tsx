'use client'

import { useState, useEffect } from 'react'
import { Leaf } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Cart from '@/components/Cart'
import NatureBackground from '@/components/NatureBackground'

interface CartItem {
  id: string
  title: string
  price: number
  color: string
  quantity: number
  image: string
}

export default function Page() {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        title: product.title,
        price: parseFloat(product.price),
        color: product.color,
        quantity: 1,
        image: product.image,
      }])
    }
  }

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId)
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId 
          ? { ...item, quantity }
          : item
      ))
    }
  }

  return (
    <div className="min-h-screen bg-transparent relative flex flex-col justify-between">
      <div className="flex-1">
        <NatureBackground />
        <Header cartCount={cartItems.length} onCartClick={() => setShowCart(!showCart)} />
        
        {showCart ? (
          <Cart 
            items={cartItems} 
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ) : (
          <>
            <Hero />
            
            <main className="max-w-7xl mx-auto px-4 py-16 relative z-10">
              <section className="mb-16">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
                    Nature&apos;s Palette
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                    Each hijab is inspired by the beauty of nature. From sage green forests to terracotta sunsets, discover modern hijabs that celebrate the natural world.
                  </p>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                      <p className="mt-4 text-muted-foreground">Loading our collection...</p>
                    </div>
                  </div>
                ) : products.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product: any) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">No products available yet.</p>
                  </div>
                )}
              </section>

              <section className="bg-card/60 backdrop-blur-md border border-white/20 dark:border-white/5 rounded-3xl p-12 text-center shadow-sm">
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Story</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                  At Tropical, we believe modest fashion should celebrate the beauty of nature. Our hijabs are crafted with premium fabrics in colors inspired by forests, deserts, oceans, and sunsets. Each piece is designed for modern Muslim women who value quality, sustainability, and style.
                </p>
              </section>
            </main>
          </>
        )}
      </div>

      <footer className="border-t border-border/40 bg-card/45 backdrop-blur-md py-8 text-center text-sm text-muted-foreground relative z-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Tropical Hijabs. All rights reserved.</p>
          <p>Designed &amp; Created by <span className="font-semibold text-foreground">Chaimae El Moussaddar</span></p>
        </div>
      </footer>
    </div>
  )
}
