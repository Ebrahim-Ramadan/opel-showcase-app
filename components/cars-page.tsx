"use client"

import { useState, useMemo } from "react"
import { Search, Sliders, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CarModal from "./car-modal"
import { useCart } from "@/hooks/use-cart"

const allCars = [
  {
    id: 1,
    name: "Astra Sports Tourer Electric",
    price: 46000,
    year: 2024,
    images: ["/Opel Astra Electric.jpg", "/Opel Astra Electric 1.jpg", "/Opel Astra Electric 2.webp", "/Opel Astra Electric 3.jpg"],
    type: "Estate",
    specs: {
      range: "416km",
      power: "115kW",
      acceleration: "0-100: 9.2s",
      seats: 5,
      transmission: "Automatic",
    },
    description:
      "Opel’s first all-electric estate car. Offers practicality, space, and comfort with zero emissions.",
  },
  {
    id: 2,
    name: "Grandland Electric",
    price: 52000,
    year: 2024,
  images: ["/Opel Grandland 2.jpg", "Opel Grandland 2.jpg", "Opel Grandland 4.jpg", "Opel Grandland 3.webp"],
    type: "SUV",
    specs: {
      range: "525km",
      power: "170kW",
      acceleration: "0-100: 7.5s",
      seats: 5,
      transmission: "Automatic",
    },
    description:
      "A bold, modern SUV featuring Opel’s latest electric platform, advanced safety tech, and efficient powertrain.",
  },
   {
    id: 3,
    name: "Zafira Electric Life",
    price: 65000,
    year: 2024,
  images: ["/Opel Zafira Electric Life.avif", "/Opel Zafira Electric Life 2.avif", "/Opel Zafira Electric Life 1.jpg", "/Opel Zafira Electric Life.jpg", "/Opel Zafira Life 2024.jpg"],
    type: "MPV / Minivan",
    specs: {
      range: "350km",
      power: "100kW",
      acceleration: "0-100: 11.5s",
      seats: 7,
      transmission: "Automatic",
    },
    description:
      "A versatile and fully electric MPV that offers spacious seating and smooth electric performance for families or business.",
  },
  {
    id: 4,
    name: "Frontera Electric",
    price: 39000,
    year: 2024,
  images: ["/Opel Frontera.jpg", "/Opel Frontera 3.jpg","/Opel Frontera 1.jpg"],
    type: "Compact SUV",
    specs: {
      range: "400km",
      power: "115kW",
      acceleration: "0-100: 8.5s",
      seats: 5,
      transmission: "Automatic",
    },
    description:
      "The all-new Opel Frontera — a family-friendly crossover that blends style, comfort, and sustainability.",
  },
  {
    id: 5,
    name: "Corsa Electric",
    price: 35000,
    year: 2024,
  images: ["/Opel Corsa 3.jpg", "/Opel Corsa 2.jpg", "/Opel Corsa 1.jpeg", "/Opel Corsa.jpg",],
    type: "Compact Hatchback",
    specs: {
      range: "402km",
      power: "100kW",
      acceleration: "0-100: 8.1s",
      seats: 5,
      transmission: "Automatic",
    },
    description:
      "Compact and efficient, the Corsa Electric is ideal for urban drivers seeking agility and low running costs.",
  },
  {
    id: 6,
    name: "Mokka Electric",
    price: 41000,
    year: 2024,
  images: ["/Opel Mokka E.webp", "/Opel Mokka E 2.jpg", "/Opel Mokka E 1.jpg"],
    type: "Compact SUV",
    specs: {
      range: "406km",
      power: "115kW",
      acceleration: "0-100: 9.0s",
      seats: 5,
      transmission: "Automatic",
    },
    description:
      "Stylish and energetic, the Mokka Electric showcases Opel’s Vizor front design and innovative interior tech.",
  },
 
];


export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState({ min: 30000, max: 80000 })
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "performance" | "name">("price-low")
  const [selectedCar, setSelectedCar] = useState<(typeof allCars)[0] | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [imageIndexes, setImageIndexes] = useState<Record<number, number>>({})
  const { addToCart } = useCart()

  const prevImage = (carId: number, e?: any) => {
    e?.stopPropagation()
    setImageIndexes((prev) => {
      const car = allCars.find((c) => c.id === carId)
      const len = (car?.images?.length ?? 1)
      const curr = prev[carId] ?? 0
      const next = (curr - 1 + len) % len
      return { ...prev, [carId]: next }
    })
  }

  const nextImage = (carId: number, e?: any) => {
    e?.stopPropagation()
    setImageIndexes((prev) => {
      const car = allCars.find((c) => c.id === carId)
      const len = (car?.images?.length ?? 1)
      const curr = prev[carId] ?? 0
      const next = (curr + 1) % len
      return { ...prev, [carId]: next }
    })
  }

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
              تصفح مجموعتنا
            </span>
          </h1>
          <p className="text-gray-400">اكتشف أوبل المثالية لك</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 border border-purple-500/20 rounded-lg p-6 mb-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* Search */}
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">بحث</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="ابحث عن السيارات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-purple-500/30 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">ترتيب حسب</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-slate-700 border border-purple-500/30 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none cursor-pointer"
              >
                <option value="price-low">السعر: الأقل إلى الأعلى</option>
                <option value="price-high">السعر: الأعلى إلى الأقل</option>
                <option value="performance">أفضل أداء</option>
                <option value="name">الاسم: أ إلى ي</option>
              </select>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600/30 border border-purple-500/50 rounded-lg text-purple-300 hover:bg-purple-600/50 transition-all"
            >
              <Sliders className="w-4 h-4" />
              تصفية
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-purple-500/20 space-y-6">
              {/* Vehicle Type Filter */}
              <div>
                <label className="text-sm text-gray-400 mb-3 block font-semibold">نوع السيارة</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      selectedType === null
                        ? "bg-purple-600 text-white border border-purple-500"
                        : "bg-slate-700 text-gray-400 border border-purple-500/20 hover:bg-slate-600"
                    }`}
                  >
                    جميع الأنواع
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
                  نطاق السعر: {(priceRange.min / 1000).toFixed(0)}ألف - {(priceRange.max / 1000).toFixed(0)}ألف ريال
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
            عرض {filteredCars.length} من {allCars.length} سيارة
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
              مسح جميع التصفيات
            </button>
          )}
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCars.map((car) => {
            const idx = imageIndexes[car.id] ?? 0
            const src = car.images && car.images.length > 0 ? car.images[idx] : "/placeholder.svg"
            return (
              <button
                key={car.id}
                onClick={() => setSelectedCar(car)}
                className="group relative bg-slate-800/50 border border-purple-500/20 rounded-lg overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 glow-pulse text-left"
              >
                {/* Car Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                  {/* left */}
                  {car.images && car.images.length > 1 && (
                    <button
                      onClick={(e) => prevImage(car.id, e)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full z-10"
                      aria-label="previous image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  )}

                  <img src={src} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />

                  {/* right */}
                  {car.images && car.images.length > 1 && (
                    <button
                      onClick={(e) => nextImage(car.id, e)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full z-10"
                      aria-label="next image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}

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
                    عرض التفاصيل
                  </Button>
                </div>
              </button>
            )
          })}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">لم يتم العثور على سيارات تطابق معاييرك.</p>
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
