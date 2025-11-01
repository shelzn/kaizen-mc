"use client"

import Image from "next/image"
import { Sword, Building2, Box } from "lucide-react"

const gamemodes = [
    {
        title: "Survival Mix",
        description: "Survival dengan twist! Enchant kustom, item unik, pets, dan banyak lagi!",
        icon: Sword,
        image:
            "/gamemode-1.webp",
        imagePosition: "right",
    },
    {
        title: "SkyBlock Tycoon",
        description: "Jadilah pemain terkaya! Generator, energi, island modules, dan banyak lagi!",
        icon: Box,
        image:
            "/gamemode-2.webp",
        imagePosition: "left",
    },
    {
        title: "Creative Mode",
        description: "Buat bangunan dengan tools yang kuat! World Edit, Arceon, axe, dan banyak lagi!",
        icon: Building2,
        image:
            "/gamemode-3.webp",
        imagePosition: "right",
    },
]

export function GamemodeSection() {
    return (
        <section className="bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 opacity-0 animate-fade-in">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-2">Gamemode Kami</h2>
                    <p className="text-gray-400">Jelajahi Minecraft dengan cara baru yang luar biasa</p>
                </div>

                <div className="space-y-12 md:space-y-24">
                    {gamemodes.map((gamemode, index) => (
                        <div
                            key={gamemode.title}
                            className={`flex flex-col gap-8 ${
                                gamemode.imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"
                            } items-center opacity-0 animate-fade-in`}
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <div className="flex-1 space-y-4 w-full">
                                <div className="inline-flex items-center gap-3 text-xl font-semibold">
                                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                                        <gamemode.icon className="w-5 h-5" />
                                    </div>
                                    {gamemode.title}
                                </div>
                                <p className="text-gray-400 max-w-lg">{gamemode.description}</p>
                            </div>

                            <div className="flex-1 w-full">
                                <div className="relative aspect-video w-full rounded-xl overflow-hidden">
                                    <Image
                                        src={gamemode.image! || "/placeholder.svg"}
                                        alt={`${gamemode.title} Screenshot`}
                                        fill
                                        className="object-cover"
                                        draggable={false}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}