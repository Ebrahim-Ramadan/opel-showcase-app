"use client"

import { useState } from "react"
import { X, ShoppingCart, Heart, Calculator } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import type { CartItem } from "@/hooks/use-cart"

interface CarModalProps {
  car: {
    id: number
    name: string
    price: number
    year: number
    image: string
    specs: {
      range: string
      power: string
      acceleration: string
      seats: number
      transmission: string
    }
    description: string
  }
  onClose: () => void
  onAddToCart: (item: CartItem) => void
  onNavigateToCheckout: () => void
}

const colorOptions = [
  { name: "Midnight Black", value: "#000000" },
  { name: "Pearl White", value: "#F5F5F5" },
  { name: "Electric Blue", value: "#0066FF" },
  { name: "Metallic Silver", value: "#C0C0C0" },
]

const interiorOptions = [
  { name: "Standard Fabric", price: 0 },
  { name: "Premium Leather", price: 3000 },
  { name: "Luxury Leather Plus", price: 6000 },
]

export default function CarModal({ car, onClose, onAddToCart, onNavigateToCheckout }: CarModalProps) {
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].name)
  const [selectedInterior, setSelectedInterior] = useState(interiorOptions[0])
  const [financingMonths, setFinancingMonths] = useState(60)
  const [isFavorite, setIsFavorite] = useState(false)

  const interiorUpcharge = selectedInterior.price
  const totalPrice = car.price + interiorUpcharge
  const monthlyPayment = totalPrice / financingMonths

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: car.id,
      name: car.name,
      price: car.price,
      year: car.year,
      image: car.image,
      color: selectedColor,
      interior: selectedInterior.name,
      interiorPrice: selectedInterior.price,
      totalPrice: totalPrice,
    }
    onAddToCart(cartItem)
    // show a toast notification
      toast.success(`${car.name} added to cart`)

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-purple-500/30 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-500/20 sticky top-0 bg-slate-800">
          <h2 className="text-2xl font-bold text-white">{car.name}</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-lg transition-all ${
                isFavorite ? "bg-pink-600/30 text-pink-400" : "bg-slate-700 text-gray-400 hover:text-pink-400"
              }`}
            >
              <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20 h-64">
            <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-full object-cover" />
          </div>

          {/* Price and Year */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Starting from</p>
              <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">
                ${(car.price / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Model Year</p>
              <p className="text-2xl font-bold text-white">{car.year}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed">{car.description}</p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Power", value: car.specs.power },
              { label: "Range", value: car.specs.range },
              { label: "Acceleration", value: car.specs.acceleration },
              { label: "Transmission", value: car.specs.transmission },
              { label: "Seats", value: car.specs.seats.toString() },
            ].map((spec, idx) => (
              <div key={idx} className="p-4 bg-slate-700/50 border border-purple-500/20 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">{spec.label}</p>
                <p className="text-lg font-bold text-purple-300">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Features List */}
          <div className="bg-slate-700/30 border border-purple-500/20 rounded-lg p-4">
            <h3 className="font-bold text-white mb-3">Premium Features</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ Premium LED lighting system</li>
              <li>✓ Advanced AI driver assistance</li>
              <li>✓ Panoramic sunroof</li>
              <li>✓ Premium sound system</li>
              <li>✓ Heated leather seats</li>
              <li>✓ Wireless charging</li>
            </ul>
          </div>

          {/* Customization Options */}
          <div className="space-y-4 p-4 bg-slate-700/20 border border-purple-500/20 rounded-lg">
            <h3 className="font-bold text-white text-lg">Customize Your Vehicle</h3>

            {/* Color Selection */}
            <div>
              <label className="text-sm text-gray-300 mb-3 block font-semibold">Exterior Color</label>
              <div className="flex gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-purple-500 bg-purple-600/20"
                        : "border-slate-600 bg-slate-700 hover:border-purple-500/50"
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-gray-400"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-sm text-gray-300">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interior Selection */}
            <div>
              <label className="text-sm text-gray-300 mb-3 block font-semibold">Interior Package</label>
              <div className="space-y-2">
                {interiorOptions.map((interior) => (
                  <button
                    key={interior.name}
                    onClick={() => setSelectedInterior(interior)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all text-left ${
                      selectedInterior.name === interior.name
                        ? "border-purple-500 bg-purple-600/20"
                        : "border-slate-600 bg-slate-700/50 hover:border-purple-500/50"
                    }`}
                  >
                    <span className="text-gray-300">{interior.name}</span>
                    {interior.price > 0 && (
                      <span className="text-sm text-purple-300 font-semibold">
                        +${(interior.price / 1000).toFixed(1)}K
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Financing Options */}
          <div className="space-y-4 p-4 bg-slate-700/20 border border-purple-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-white text-lg">Financing Options</h3>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Loan Duration: {financingMonths} months</label>
              <input
                type="range"
                min="24"
                max="84"
                value={financingMonths}
                onChange={(e) => setFinancingMonths(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>2 years</span>
                <span>7 years</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-purple-500/20">
              <div className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Total Price</p>
                <p className="text-xl font-bold text-white">${(totalPrice / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-3">
                <p className="text-gray-300 text-xs mb-1">Monthly Payment</p>
                <p className="text-xl font-bold text-purple-300">${(monthlyPayment / 1000).toFixed(1)}K</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 sticky bottom-0 bg-slate-800 pb-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-purple-500/30 text-white hover:bg-slate-700 bg-transparent"
            >
              Close
            </Button>
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
