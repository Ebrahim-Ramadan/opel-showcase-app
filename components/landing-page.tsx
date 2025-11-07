"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Zap, Star, Gauge, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"

const featuredCars = [
  {
    id: 1,
    name: "Opel Astra Electric",
    year: 2024,
    price: 45000,
    image: "/Opel Astra Electric.jpg",
    badge: "NEW",
    spec: "0-100 in 6.2s",
  },
  {
    id: 2,
    name: "Opel Grandland X",
    year: 2024,
    price: 52000,
    image: "/Opel Grandland X.jpg",
    badge: "FEATURED",
    spec: "AWD Performance",
  },
  {
    id: 3,
    name: "Opel Mokka E",
    year: 2024,
    price: 38000,
    image: "/Opel Mokka E 1.jpg",
    badge: "POPULAR",
    spec: "500km Range",
  },
  {
    id: 4,
    name: "Opel Insignia",
    year: 2024,
    price: 65000,
    image: "/Opel Insignia.jpg",
    badge: "LUXURY",
    spec: "Twin Turbo",
  },
]

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Business Executive",
    comment: "The Grandland X has transformed my driving experience. Luxury meets performance perfectly.",
    rating: 5,
  },
  {
    name: "James Chen",
    role: "Tech Entrepreneur",
    comment: "Outstanding build quality and cutting-edge technology. Worth every penny.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Environmental Advocate",
    comment: "The Astra Electric proves you don't sacrifice performance for sustainability.",
    rating: 5,
  },
]

interface LandingPageProps {
  setCurrentPage?: (page: string) => void
}

export default function LandingPage({ setCurrentPage }: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  useEffect(() => {
    if (!isAutoplay) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCars.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoplay])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredCars.length)
    setIsAutoplay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredCars.length) % featuredCars.length)
    setIsAutoplay(false)
  }

  const currentCar = featuredCars[currentSlide]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Carousel */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 gradient-shift bg-gradient-to-r from-purple-900/20 via-slate-900 to-pink-900/20" />

        {/* Slides */}
        <div className="relative h-full">
          {featuredCars.map((car, idx) => (
            <div
              key={car.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Car Image */}
              <div className="absolute inset-0">
                <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="space-y-4 z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full backdrop-blur-sm">
                    <Zap className="w-4 h-4 text-purple-300" />
                    <span className="text-sm font-semibold text-purple-300">{car.badge}</span>
                  </div>

                  <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg">
                    <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                      {car.name}
                    </span>
                  </h1>

                  <p className="text-2xl text-gray-300 font-light">{car.spec}</p>

                  <div className="flex gap-6 justify-center items-center pt-4">
                    <div>
                      <p className="text-gray-200 text-sm">Starting from</p>
                      <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">
                        ${(car.price / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        setCurrentPage?.("cars")
                      }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-purple-500/50 transition-transform transform-gpu hover:scale-105"
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-purple-600/50 hover:bg-purple-600 text-white p-3 rounded-full transition-all glow-pulse"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-purple-600/50 hover:bg-purple-600 text-white p-3 rounded-full transition-all glow-pulse"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {featuredCars.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx)
                setIsAutoplay(false)
              }}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide
                  ? "w-8 bg-purple-500 shadow-lg shadow-purple-500/50 glow-pulse"
                  : "w-2 bg-gray-500/50 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>









{/* Featured Videos Section */}
        <div className="my-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Experience Grandland
            </span>
          </h2>

         <div className="relative rounded-lg overflow-hidden bg-slate-800/50 ">
              <div className="aspect-square overflow-hidden bg-black">
                <video
                  src="/opel_grandland_how-it-feels-inside_1920x1920.mp4"
                  controls = {false}
                  loop
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                  poster="/Opel Grandland.jpg"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute top-0 left-0 right-4 bg-gradient-to-b from-black/50 to-transparent px-4 py-12 w-full inline-block w-fit">
                <p className="text-white font-bold text-4xl md:text-6xl">How It Feels Inside</p>
                <p className="text-purple-100 font-semibold text-xl md:text-3xl">Luxury meets comfort</p>
              </div>
            </div>
          {/* <div className="relative rounded-lg overflow-hidden bg-slate-800/50  ">
              <div className="aspect-square overflow-hidden bg-black">
                <video
                  src="/opel_grandland_how-it feels-to-drive_1920x1920.mp4"
                  controls
                  className="w-full h-full object-cover"
                  poster="/Opel Grandland.jpg"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute top-4 left-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg inline-block w-fit">
                <p className="text-white font-bold text-lg">How It Feels to Drive</p>
                <p className="text-purple-100 text-sm">Experience pure performance</p>
              </div>
            </div> */}

        </div>
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Why Choose Opel?
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { title: "Premium Design", desc: "Cutting-edge aesthetics meets luxury comfort", icon: Zap },
            { title: "Electric Future", desc: "Eco-friendly performance without compromise", icon: Leaf },
            { title: "Advanced Tech", desc: "Latest AI and autonomous features", icon: Gauge },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-slate-800/50  transition-all hover:shadow-lg hover:shadow-purple-500/20 glow-pulse"
              >
                <Icon className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            )
          })}
        </div>
     
        {/* Testimonials Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              What Our Customers Say
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/50 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-purple-400 text-purple-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-purple-300">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Showcase Specifications */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Performance Highlights
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Top Speed", value: "250+ km/h" },
              { label: "0-100 km/h", value: "4.2s" },
              { label: "Electric Range", value: "900km" },
              { label: "Power Output", value: "400+ kW" },
            ].map((spec, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 text-center hover:border-purple-500/50 transition-all"
              >
                <p className="text-gray-400 text-sm mb-2">{spec.label}</p>
                <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>

   

        {/* Call-to-Action Section */}
        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg p-12 text-center mb-20">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Drive Excellence?</h3>
          <p className="text-gray-300 mb-8 text-lg">
            Explore our complete collection and find your perfect Opel today.
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all">
            Browse Collection
          </Button>
        </div>

        {/* Contact Us Section */}
        <div className="bg-slate-800/50 border border-purple-500/20 rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <div className="space-y-6">
            <p className="text-gray-300 text-lg">
              Have questions about our vehicles? Our team is ready to help you find the perfect Opel.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center">
                  <span className="text-2xl text-purple-300">📞</span>
                </div>
                <div className="text-left">
                  <p className="text-gray-400 text-sm">Call us now</p>
                  <a href="tel:+201010381150" className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text hover:from-purple-200 hover:to-pink-200 transition-all">
                    +20 101 038 1150
                  </a>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-purple-500/20" />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center">
                  <span className="text-2xl text-purple-300">🕐</span>
                </div>
                <div className="text-left">
                  <p className="text-gray-400 text-sm">Hours</p>
                  <p className="text-lg font-semibold text-white">Mon - Fri: 9AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
