"use client"
import { useState, useEffect } from "react"
import { ArrowRight, ShoppingCart } from "lucide-react"
import LandingPage from "./landing-page"
import CarsPage from "./cars-page"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"

interface DashboardProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  onLogout: () => void
}

export default function Dashboard({ currentPage, setCurrentPage, onLogout }: DashboardProps) {
  const [navigateToCheckout, setNavigateToCheckout] = useState(false)
  const { cart, isLoaded } = useCart()

  // Handle checkout navigation
  useEffect(() => {
    if (navigateToCheckout) {
      window.location.href = "/checkout"
    }
  }, [navigateToCheckout])

  if (navigateToCheckout) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage("home")}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all"
          >
            <img
            src='/opel logo.png'
              alt='Opel Logo'
              className='h-12'
            />
          </button>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => setCurrentPage("home")}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentPage === "home"
                  ? "bg-purple-600/30 text-purple-300 border border-purple-500/50"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => setCurrentPage("cars")}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentPage === "cars"
                  ? "bg-purple-600/30 text-purple-300 border border-purple-500/50"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
               السيارات
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setNavigateToCheckout(true)}
              className=" relative px-4 py-2 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/50 hover:bg-purple-600/50 transition-all flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {/* <ArrowRight className="w-3 h-3 group/hover:scale-105" /> */}
              {isLoaded && cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            <Button onClick={onLogout} variant="ghost" className="text-gray-400 hover:text-red-400 hover:bg-red-500/10">
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="pt-16">{currentPage === "home" ? <LandingPage setCurrentPage={setCurrentPage} /> : <CarsPage />}</div>
    </div>
  )
}
