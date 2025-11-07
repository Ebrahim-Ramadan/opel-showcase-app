"use client"

import { useState, useMemo } from "react"
import { Search, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CarModal from "./car-modal"
import { useCart } from "@/hooks/use-cart"

const allCars = [
  {
    id: 1,
    name: "Astra Electric",
    price: 45000,
    year: 2024,
    image: "/Opel Astra Electric.jpg",
    type: "Sedan",
    specs: {
      range: "500km",
      power: "250kW",
      acceleration: "0-100: 6.2s",
      seats: 5,
      transmission: "Automatic",
    },
    description:
      "Experience the future with our fully electric Astra. Perfect for eco-conscious drivers who refuse to compromise on performance.",
  },
  {
    id: 2,
    name: "Grandland X",
    price: 52000,
    year: 2024,
    image: "/Opel Grandland X.jpg",
    type: "SUV",
    specs: {
      range: "650km",
      power: "280kW",
      acceleration: "0-100: 5.8s",
      seats: 5,
      transmission: "Automatic",
    },
    description: "The ultimate SUV combining luxury and performance. AWD technology ensures confidence on any road.",
  },
  {
    id: 3,
    name: "Mokka E",
    price: 38000,
    year: 2024,
    image: "/Opel Mokka E.webp",
    type: "Compact SUV",
    specs: {
      range: "400km",
      power: "200kW",
      acceleration: "0-100: 7.1s",
      seats: 5,
      transmission: "Automatic",
    },
    description: "Agile, efficient, and stylish. The perfect city companion with premium features throughout.",
  },
  {
    id: 4,
    name: "Insignia",
    price: 65000,
    year: 2024,
    image: "/Opel Insignia.jpg",
    type: "Executive",
    specs: {
      range: "800km",
      power: "310kW",
      acceleration: "0-100: 5.3s",
      seats: 5,
      transmission: "Automatic",
    },
    description: "Executive elegance redefined. Twin turbocharged power meets sophisticated design.",
  },
  {
    id: 5,
    name: "Corsa SE",
    price: 32000,
    year: 2024,
    image: "/Opel Corsa SE.jpeg",
    type: "Compact",
    specs: {
      range: "350km",
      power: "180kW",
      acceleration: "0-100: 7.5s",
      seats: 5,
      transmission: "Automatic",
    },
    description: "Sporty and fun. Great value for budget-conscious buyers who still want premium quality.",
  },
  {
    id: 6,
    name: "Omega GT",
    price: 78000,
    year: 2024,
    image: "/Opel Omega GT.webp",
    type: "Luxury",
    specs: {
      range: "900km",
      power: "400kW",
      acceleration: "0-100: 4.2s",
      seats: 5,
      transmission: "Automatic",
    },
    description: "The pinnacle of Opel engineering. Superb performance and luxury for the discerning driver.",
  },
]

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState({ min: 30000, max: 80000 })
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "performance" | "name">("price-low")
  const [selectedCar, setSelectedCar] = useState<(typeof allCars)[0] | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const { addToCart } = useCart()

  const filteredCars = useMemo(() => {
    const filtered = allCars.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = car.price >= priceRange.min && car.price <= priceRange.max
      const matchesType = !selectedType || car.type === selectedType
      return matchesSearch && matchesPrice && matchesType
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-high":
          return b.price - a.price
        case "performance": {
          const aAccel = Number.parseFloat(a.specs.acceleration.split(": ")[1])
          const bAccel = Number.parseFloat(b.specs.acceleration.split(": ")[1])
          return aAccel - bAccel
        }
        case "name":
          return a.name.localeCompare(b.name)
        case "price-low":
        default:
          return a.price - b.price
      }
    })

    return filtered
  }, [searchTerm, priceRange, selectedType, sortBy])

  const vehicleTypes = Array.from(new Set(allCars.map((car) => car.type)))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Browse Our Collection
            </span>
          </h1>
          <p className="text-gray-400">Discover your perfect Opel</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 border border-purple-500/20 rounded-lg p-6 mb-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* Search */}
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-purple-500/30 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-slate-700 border border-purple-500/30 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none cursor-pointer"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="performance">Best Performance</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600/30 border border-purple-500/50 rounded-lg text-purple-300 hover:bg-purple-600/50 transition-all"
            >
              <Sliders className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-purple-500/20 space-y-6">
              {/* Vehicle Type Filter */}
              <div>
                <label className="text-sm text-gray-400 mb-3 block font-semibold">Vehicle Type</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      selectedType === null
                        ? "bg-purple-600 text-white border border-purple-500"
                        : "bg-slate-700 text-gray-400 border border-purple-500/20 hover:bg-slate-600"
                    }`}
                  >
                    All Types
                  </button>
                  {vehicleTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        selectedType === type
                          ? "bg-purple-600 text-white border border-purple-500"
                          : "bg-slate-700 text-gray-400 border border-purple-500/20 hover:bg-slate-600"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="text-sm text-gray-400 mb-3 block font-semibold">
                  Price Range: ${(priceRange.min / 1000).toFixed(0)}K - ${(priceRange.max / 1000).toFixed(0)}K
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="30000"
                    max="80000"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        min: Math.min(Number.parseInt(e.target.value), prev.max),
                      }))
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="30000"
                    max="80000"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        max: Math.max(Number.parseInt(e.target.value), prev.min),
                      }))
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-gray-400 mb-6 flex items-center justify-between">
          <span>
            Showing {filteredCars.length} of {allCars.length} cars
          </span>
          {/* Clear all filters */}
          {(searchTerm || priceRange.min !== 30000 || priceRange.max !== 80000 || selectedType) && (
            <button
              onClick={() => {
                setSearchTerm("")
                setPriceRange({ min: 30000, max: 80000 })
                setSelectedType(null)
              }}
              className="text-purple-400 hover:text-purple-300 text-sm underline transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCars.map((car) => (
            <button
              key={car.id}
              onClick={() => setSelectedCar(car)}
              className="group relative bg-slate-800/50 border border-purple-500/20 rounded-lg overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 glow-pulse text-left"
            >
              {/* Car Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                <img
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                {/* Vehicle type badge */}
                <div className="absolute top-3 right-3 bg-purple-600/80 px-3 py-1 rounded-full text-xs font-semibold text-white">
                  {car.type}
                </div>
              </div>

              {/* Car Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">{car.name}</h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">
                    ${(car.price / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-gray-400">{car.specs.acceleration}</p>
                  <p className="text-sm text-gray-400">{car.specs.range} Range</p>
                </div>

                <Button
                  onClick={() => setSelectedCar(car)}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg"
                >
                  View Details
                </Button>
              </div>
            </button>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No cars found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Car Modal */}
      {selectedCar && (
        <CarModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onAddToCart={addToCart}
          onNavigateToCheckout={() => {
            window.location.href = "/checkout"
          }}
        />
      )}
    </div>
  )
}
