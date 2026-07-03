'use client'

import { Trash2, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface CartItem {
  id: string
  title: string
  price: number
  color: string
  quantity: number
  image: string
}

interface CartProps {
  items: CartItem[]
  onRemove: (id: string) => void
  onUpdateQuantity: (id: string, quantity: number) => void
}

export default function Cart({ items, onRemove, onUpdateQuantity }: CartProps) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleCheckout = () => {
    const phoneNumber = "212665626902"
    let message = "Bonjour, je souhaite passer une commande :\n\n"
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.title} (${item.color}) - MAD ${(item.price * item.quantity).toFixed(2)}\n`
    })
    message += `\nSous-total : MAD ${total.toFixed(2)}`
    message += `\nLivraison : MAD 10.00`
    message += `\n*Total a payer : MAD ${(total + 10).toFixed(2)}*`
    
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-12">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground mb-6">Your cart is empty</p>
          <p className="text-sm text-muted-foreground">Add some beautiful hijabs to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-xl p-6 border border-border flex gap-6"
                >
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Color: {item.color}
                    </p>
                    <p className="text-lg font-bold text-primary mt-2">
                      MAD{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>

                    <div className="flex items-center gap-2 bg-muted rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-primary/10 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-primary/10 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-8 border border-border sticky top-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>MAD{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>MAD10.00</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">MAD{(total + 10).toFixed(2)}</span>
                </div>
              </div>

              <Button onClick={handleCheckout} className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-6 text-lg">
                Commander via WhatsApp
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Secure checkout
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
