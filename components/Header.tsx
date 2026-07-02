'use client'

import { ShoppingCart, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card/70 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Tropical</h1>
        </div>
        
        <Button
          onClick={onCartClick}
          variant="ghost"
          size="lg"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-secondary text-secondary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {cartCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  )
}
