"use client"

import { Card } from "@/components/ui/card"
import { points } from "@/lib/product-list"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Store() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 min-h-screen">
      <div className="text-center space-y-4 opacity-0 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="font-bold text-yellow-400 mb-2">Toko Premium Points</span>
        </h1>
        <p className="text-lg text-gray-300">Beli Premium Points untuk membuka fitur eksklusif</p>
      </div>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {points.map((point) => (
          <Link
            key={point.id}
            href={`/store/product/${point.id}`}
            className="block opacity-0 animate-fade-in"
            style={{ animationDelay: point.delay }}
          >
            <Card className="transform cursor-pointer overflow-hidden rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-yellow-400/50 hover:shadow-[0_0_15px_rgba(255,215,0,0.4)]">
              <div className="p-6">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-900/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <Image
                    src={point.image || "/placeholder.svg"}
                    alt={`${point.amount} Premium Points`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Card>
          </Link>
        ))}        
      </div>

    </div>
  )
}
