import { Check, Gamepad2 } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "sonner";

export default function HeroSection() {
    const handleCopyIp = () => {
        navigator.clipboard.writeText("play.kaizenmc.id")
            .then(() =>
                toast(
                    <div className="flex items-center justify-center gap-2"> {/* Pastikan semua konten berada di tengah */}
                        <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
                            <Check className="w-4 h-4 text-black" />
                        </div>
                        <p className="font-bold text-center">
                            play.kaizenmc.id <span className="font-normal">disalin ke clipboard!</span>
                        </p>
                    </div>
                )
            );
    }
    
    return (
        <section className="text-center space-y-6 opacity-0 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold">
                Selamat Datang di
                <span className="block mt-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-transparent bg-clip-text animate-gradient">
                    Kaizen Network
                </span>
            </h1>

            <p className="text-gray-400 text-xl md:text-2xl">Tempat semua orang mendapatkan inspirasi mereka.</p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/70 border border-gray-700 text-sm">
                <div className="w-2.5 h-2.5 rounded-full mr-2 bg-green-500">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </div>
                <span className="text-sm font-medium text-gray-300">Server online · 117 Players · play.kaizenmc.id</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                <Button
                    size="xl"
                    className="px-8 py-3 rounded-xl text-lg font-semibold transition-colors w-full sm:w-auto flex items-center justify-center text-center bg-[#f8cb08] text-black group relative duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_0_0_rgba(248,203,8,0)] hover:shadow-[0_8px_16px_rgba(248,203,8,0.15)] hover:bg-yellow-400/90 hover:animate-bounceSoft"
                    onClick={handleCopyIp}
                >
                    <Gamepad2 size={100} />
                    Main Sekarang
                </Button>

                <Button
                    size="xl"
                    variant="outline"
                    className="rounded-xl w-full sm:w-auto flex items-center justify-center text-center border-gray-500 hover:border-white group relative px-8 py-3 text-lg font-semibold border shadow-[0_0_0_rgba(255,255,255,0)] transition-[background,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-[0_8px_16px_rgba(255,255,255,0.08)] hover:border-white/20 hover:bg-white/[0.03] hover:animate-bounceSoft active:scale-95"
                >
                    <Image
                        src="/discord.svg"
                        alt="Discord"
                        className="w-6 h-6 mr-2 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
                        width={9}
                        height={9}
                        draggable={false}
                    />
                    Gabung Discord
                </Button>
            </div>
        </section>
    )
}