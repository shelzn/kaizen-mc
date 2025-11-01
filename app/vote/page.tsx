import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

const votingSites = [
    {
        name: "Minecraft-MP",
        url: "https://minecraft-mp.com/server/xxx/vote/",
    },
    {
        name: "MinecraftPocket Servers",
        url: "https://minecraftpocket-servers.com/server/xxx",
    },
]

export default function VotePage() {
    return (
        <div className="container max-w-2xl mx-auto px-4 py-8">
            <div className="text-center space-y-4 mb-12 opacity-0 animate-fade-in">
                <h1 className="text-4xl font-bold text-yellow-400">Vote untuk Server Kami</h1>
                <p className="text-gray-400 max-w-lg mx-auto">
                    Dukung kami dengan vote di platform ini! Setiap vote membantu kami berkembang dan memberi hadiah untuk Anda.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                {votingSites.map((site, index) => (
                    <Card
                        key={site.name}
                        className="w-full p-6 bg-gray-800/80 opacity-0 animate-fade-in border border-white/5 flex flex-col justify-between"
                        style={{animationDelay: `${(index + 1) * 100}ms`}}
                    >
                        <div
                            className="font-semibold text-white text-lg flex items-center gap-2 justify-center">
                            {site.name}
                            <ExternalLink className="w-4 h-4 text-gray-400"/>
                        </div>
                        <a href={site.url} target="_blank" rel="noopener noreferrer"
                            className="mt-4 flex justify-center">
                            <Button
                                className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold min-w-[140px] rounded-xl">
                                Vote Now
                            </Button>
                        </a>
                    </Card>
                ))}
            </div>
        </div>
    )
}

