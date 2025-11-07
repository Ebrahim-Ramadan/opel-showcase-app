"use client"

import { useState, useEffect } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  year: number
  image: string
  color: string
  interior: string
  interiorPrice: number
  totalPrice: number
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("opel-cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch {
        setCart([])
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("opel-cart", JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, { ...item, id: Date.now() }])
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0)
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    isLoaded,
  }
}
