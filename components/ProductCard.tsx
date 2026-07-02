'use client'

import { useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ProductCardProps {
  product: {
    id: string
    title: string
    price: string
    color: string
    description?: string
    image: string
  }
  onAddToCart: (product: any) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      onAddToCart(product)
      setTimeout(() => setIsAdding(false), 300)
    } catch (error) {
      console.error('Error adding to cart:', error)
      setIsAdding(false)
    }
  }

  return (
    <div className="group bg-card/65 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 dark:border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:bg-card/80">
      <div className="relative aspect-square overflow-hidden bg-muted/50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-4 right-4 p-2 bg-card/80 backdrop-blur rounded-full hover:bg-card transition-colors"
        >
          <Heart
            className={`w-5 h-5 MAD{isFavorited ? 'fill-secondary text-secondary' : 'text-muted-foreground'}`}
          />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Color: <span className="font-medium text-foreground">{product.color}</span>
          </p>
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            MAD{product.price}
          </span>
          <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isAdding ? 'Adding...' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  )
}
