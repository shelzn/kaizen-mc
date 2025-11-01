"use client"

import { Check, Gamepad2 } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import { toast } from "sonner"

export default function HeroSection() {
  const handleCopyIp = () => {
    navigator.clipboard.writeText("play.kaizenmc.id").then(() =>
      toast(
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
            <Check className="w-4 h-4 text-black" />
          </div>
          <p className="font-bold text-center">
            play.kaizenmc.id <span className="font-normal">disalin ke clipboard!</span>
          </p>
        </div>,
      ),
    )
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/hero.webp')" }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
      </div>
      <section className="text-center space-y-3 md:space-y-4 opacity-0 animate-fade-in px-4 md:px-0">
        <h1 className="text-4xl md:text-7xl font-bold leading-tight">
          Selamat Datang di
          <span className="block mt-1 md:mt-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-transparent bg-clip-text animate-gradient">
            Kaizen Network
          </span>
        </h1>

        <p className="text-gray-400 text-sm md:text-xl">Tempat semua orang mendapatkan inspirasi mereka.</p>

        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-gray-800/70 border border-gray-700 text-xs md:text-sm">
          <div className="w-2.5 h-2.5 rounded-full mr-2 bg-green-500">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          </div>
          <span className="text-xs md:text-sm font-medium text-gray-300">
            Server online · 117 Players · play.kaizenmc.id
          </span>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-3 md:gap-4 pt-2">
          <Button
            size="xl"
            className="w-full md:w-auto px-6 md:px-8 py-3 rounded-xl text-base md:text-lg font-semibold transition-colors flex items-center justify-center text-center bg-[#f8cb08] text-black group relative duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_0_0_rgba(248,203,8,0)] hover:shadow-[0_8px_16px_rgba(248,203,8,0.15)] hover:bg-yellow-400/90 hover:animate-bounceSoft"
            onClick={handleCopyIp}
          >
            <Gamepad2 size={20} className="mr-2" />
            Main Sekarang
          </Button>

          <Button
            size="xl"
            variant="outline"
            className="w-full md:w-auto rounded-xl flex items-center justify-center text-center border-gray-500 hover:border-white group relative px-6 md:px-8 py-3 text-base md:text-lg font-semibold border shadow-[0_0_0_rgba(255,255,255,0)] transition-[background,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-[0_8px_16px_rgba(255,255,255,0.08)] hover:border-white/20 hover:bg-white/[0.03] hover:animate-bounceSoft active:scale-95 bg-transparent"
          >
            <Image
              src="/discord.svg"
              alt="Discord"
              className="w-5 h-5 md:w-6 md:h-6 mr-2 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
              width={9}
              height={9}
              draggable={false}
            />
            Gabung Discord
          </Button>
        </div>
      </section>
    </>
  )
}
