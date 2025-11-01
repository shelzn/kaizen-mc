"use client"

import { useState } from "react"
import { Users, ShieldCheck, Gamepad2, Globe2, ChevronDown, ChevronUp } from "lucide-react"

export function AboutSection() {
  const [expanded, setExpanded] = useState(false)

  // teks panjang yang ingin dipotong
  const fullText = `Kaizen Network adalah server Minecraft Indonesia yang menghadirkan pengalaman bermain terbaik untuk semua pemain. Kami menawarkan berbagai fitur seru, unik, dan lucu, serta sub-server seperti Survival Mix, Tycoon, dan Creative, serta mode baru yang akan datang. Komunitas kami ramah, aktif, dan selalu siap membantu pemain baru. Server ini bebas lag, memiliki sistem anti-cheat, dan mendukung Minecraft versi terbaru baik Java Edition maupun Bedrock Edition. Ayo bergabung di Kaizen Network dan rasakan sensasi bermain di server Minecraft Indonesia dengan kualitas premium.`

  const maxLength = 113

  const displayedText = expanded ? (
    fullText
  ) : (
    <>
      {fullText.slice(0, maxLength)}
      <span className="text-gray-500">...</span>
    </>
  )

  const features = [
    { icon: <Users className="w-8 h-8 text-yellow-400" />, title: "Komunitas Ramah" },
    { icon: <ShieldCheck className="w-8 h-8 text-yellow-400" />, title: "Dilindungi Anti-Cheat" },
    { icon: <Gamepad2 className="w-8 h-8 text-yellow-400" />, title: "Versi Terbaru" },
    { icon: <Globe2 className="w-8 h-8 text-yellow-400" />, title: "Pengalaman Bebas Lag" },
  ]

  return (
    <section className="relative py-12 mx-auto bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400">Tentang Kaizen Network</h2>

          <p className="text-gray-300 text-base leading-relaxed max-w-lg transition-all duration-300">
            {displayedText}
          </p>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-yellow-400 font-semibold hover:underline underline-offset-4 transition"
          >
            {expanded ? (
              <>
                Baca lebih sedikit <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Baca selengkapnya <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Right Side — Feature Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-800
                        transition-all duration-500 ease-out
                        hover:scale-105 active:scale-95
                        hover:border-yellow-400/40
                        hover:shadow-[0_0_25px_rgba(250,204,21,0.25)]
                        cursor-pointer select-none
                        bg-gradient-to-tr from-gray-900 to-gray-800
                        hover:from-gray-900 hover:to-white/15"
              style={{
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <div className="p-2 bg-[#f8cb08]/10 rounded-xl text-[#f8cb08] mb-2">{feature.icon}</div>
              <p className="font-medium text-xs text-gray-300 text-center">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
