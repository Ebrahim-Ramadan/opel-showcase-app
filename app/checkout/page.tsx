"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, CheckCircle, Lock, Shield, Truck, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/use-cart"
import type React from "react"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  })
  const [orderComplete, setOrderComplete] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { cart, removeFromCart, clearCart } = useCart()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
      if (!formData.email.includes("@")) newErrors.email = "Valid email is required"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      if (!formData.address.trim()) newErrors.address = "Address is required"
      if (!formData.city.trim()) newErrors.city = "City is required"
      if (!formData.state.trim()) newErrors.state = "State is required"
      if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
    } else if (step === 2) {
      if (!formData.cardNumber.replace(/\s/g, "").match(/^\d{13,19}$/)) {
        newErrors.cardNumber = "Valid card number is required"
      }
      if (!formData.cardExpiry.match(/^\d{2}\/\d{2}$/)) newErrors.cardExpiry = "Use MM/YY format"
      if (!formData.cardCVC.match(/^\d{3,4}$/)) newErrors.cardCVC = "Valid CVC is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep()) {
      if (step === 1) {
        setStep(2)
      } else if (step === 2) {
        setOrderComplete(true)
      }
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : value
  }

  if (!isMounted) {
    return null
  }

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0)
  const tax = subtotal * 0.08
  const shipping = cart.length > 0 ? 500 : 0
  const total = subtotal + tax + shipping

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 border border-purple-500/30 rounded-lg p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400/30 rounded-full animate-pulse" />
              <CheckCircle className="w-16 h-16 text-green-400 relative z-10" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
            <p className="text-gray-400">Thank you for your purchase</p>
          </div>

          <div className="bg-slate-700/50 border border-purple-500/20 rounded-lg p-4 space-y-3">
            <p className="text-gray-400 text-sm mb-3">Items Ordered ({cart.length})</p>
            {cart.map((item) => (
              <div key={item.id} className="text-left">
                <p className="text-white font-semibold">{item.name}</p>
                <p className="text-purple-300 text-sm">${(item.totalPrice / 1000).toFixed(0)}K</p>
              </div>
            ))}
          </div>

          <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4 text-left">
            <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">
              ${(total / 1000).toFixed(0)}K Total
            </p>
          </div>

          <div className="bg-slate-700/30 border border-purple-500/20 rounded-lg p-4 text-left space-y-3">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Order Number</p>
              <p className="text-white font-mono font-bold mt-1">
                OP-{Math.random().toString(36).substring(2, 9).toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Delivery Timeline</p>
              <p className="text-white font-semibold mt-1">6-8 weeks</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Confirmation Email</p>
              <p className="text-white text-sm mt-1 break-all">{formData.email}</p>
            </div>
          </div>

          <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4 text-left">
            <p className="text-purple-300 font-semibold mb-3">What's Next?</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ Confirmation email sent to your inbox</li>
              <li>✓ Track your order in your account</li>
              <li>✓ Receive delivery updates via SMS</li>
            </ul>
          </div>

          <Button
            onClick={() => {
              clearCart()
              window.location.href = "/"
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 border border-purple-500/30 rounded-lg p-8 text-center space-y-6">
          <div className="text-6xl">🛒</div>
          <h1 className="text-3xl font-bold text-white">Your Cart is Empty</h1>
          <p className="text-gray-400">Add some cars before checking out</p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => (window.location.href = "/")}
          className="flex items-center gap-2 text-purple-300 hover:text-purple-200 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shopping
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 border border-purple-500/30 rounded-lg p-8">
              {/* Step Indicator */}
              <div className="flex gap-4 mb-8">
                {[1, 2].map((s) => (
                  <div key={s} className="flex-1 space-y-2">
                    <div
                      className={`h-2 rounded-full transition-all ${s <= step ? "bg-purple-500" : "bg-slate-700"}`}
                    />
                    <p className="text-xs text-gray-400 font-semibold">{s === 1 ? "Shipping" : "Payment"}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-white mb-6">
                {step === 1 ? "Shipping Address" : "Payment Details"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className={`bg-slate-700 border-purple-500/30 text-white placeholder:text-gray-500 ${
                            errors.firstName ? "border-red-500/50" : ""
                          }`}
                        />
                        {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className={`bg-slate-700 border-purple-500/30 text-white placeholder:text-gray-500 ${
                            errors.lastName ? "border-red-500/50" : ""
                          }`}
                        />
                        {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`bg-slate-700 border-purple-500/30 text-white placeholder:text-gray-500 ${
                          errors.email ? "border-red-500/50" : ""
                        }`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className={`bg-slate-700 border-purple-500/30 text-white placeholder:text-gray-500 ${
                          errors.phone ? "border-red-500/50" : ""
                        }`}
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <Input
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className={`bg-slate-700 border-purple-500/30 text-white placeholder:text-gray-500 ${
                          errors.address ? "border-red-500/50" : ""
                        }`}
                      />
                      {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className={`bg-slate-700 border-purple-500/30 text-white placeholder:text-gray-500 ${
                            errors.city ? "border-red-500/50" : ""
                          }`}
                        />
                        {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Input
                          type="text"
                          name="state"
                          placeholder="State"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className={`bg-slate-700 border-purple-500/30 text-white placeholder:text-gray-500 ${
                            errors.state ? "border-red-500/50" : ""
                          }`}
                        />
                        {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state}</p>}
                      </div>
                      <div>
                        <Input
                          type="text"
                          name="zipCode"
                          placeholder="ZIP Code"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          className={`bg-slate-700 border-purple-500/30 text-white placeholder:text-gray-500 ${
                            errors.zipCode ? "border-red-500/50" : ""
                          }`}
                        />
                        {errors.zipCode && <p className="text-red-400 text-xs mt-1">{errors.zipCode}</p>}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          handleInputChange({
                            ...e,
                            target: { ...e.target, value: formatCardNumber(e.target.value) },
                          } as any)
                        }}
                        required
                        className={`bg-slate-700 border-purple-500/30 text-white placeholder:text-gray-500 font-mono ${
                          errors.cardNumber ? "border-red-500/50" : ""
                        }`}
                      />
                      {errors.cardNumber && <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          type="text"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          required
                          className={`bg-slate-700 border-purple-500/30 text-white placeholder:text-gray-500 ${
                            errors.cardExpiry ? "border-red-500/50" : ""
                          }`}
                        />
                        {errors.cardExpiry && <p className="text-red-400 text-xs mt-1">{errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <Input
                          type="text"
                          name="cardCVC"
                          placeholder="CVC"
                          value={formData.cardCVC}
                          onChange={handleInputChange}
                          required
                          className={`bg-slate-700 border-purple-500/30 text-white placeholder:text-gray-500 ${
                            errors.cardCVC ? "border-red-500/50" : ""
                          }`}
                        />
                        {errors.cardCVC && <p className="text-red-400 text-xs mt-1">{errors.cardCVC}</p>}
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => (window.location.href = "/")}
                    variant="outline"
                    className="flex-1 border-purple-500/30 text-white hover:bg-slate-700 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                  >
                    {step === 1 ? "Continue to Payment" : "Complete Order"}
                  </Button>
                </div>
              </form>

              {step === 2 && (
                <div className="mt-6 pt-6 border-t border-purple-500/20 flex gap-4 justify-center text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Lock className="w-4 h-4" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>SSL Encrypted</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 border border-purple-500/30 rounded-lg p-6 sticky top-4 space-y-4">
              <h3 className="text-lg font-bold text-white">Order Summary</h3>

              {/* Cart Items */}
              <div className="bg-slate-700/50 rounded-lg p-4 space-y-3 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-2 pb-3 border-b border-purple-500/10"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-gray-400 text-xs mt-1">{item.color}</p>
                      <p className="text-gray-400 text-xs">{item.interior}</p>
                      <p className="text-purple-300 font-semibold text-sm mt-2">
                        ${(item.totalPrice / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors flex-shrink-0"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-purple-500/20">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span>${(subtotal / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Tax (8%)</span>
                  <span>${(tax / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Shipping</span>
                  <span>${(shipping / 1000).toFixed(1)}K</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-purple-500/20">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">
                    ${(total / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-500/20">
                <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
                  <Truck className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-300">Delivery Estimate</p>
                    <p className="text-xs text-gray-400 mt-1">6-8 weeks from order confirmation</p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 mt-4 p-3 bg-slate-700/30 rounded border border-slate-600/50">
                This is a demo checkout. No payment will be processed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
