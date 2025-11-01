import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
    return (
        <footer className="bg-gray-900">
            <div className="container mx-auto max-w-[1200px] px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
                    {/* Left Column - Logo and Social */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-3 mb-8">
                            <Image src="/logo.webp" alt="Kaizen Network" width={280} height={80} className="rounded" draggable={false} loading="lazy" />
                        </div>

                        <div className="flex gap-6">
                            <Link
                                href="https://discord.gg/kaizen"
                                className="text-gray-400 hover:text-white transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                                <span className="sr-only">Discord</span>
                            </Link>
                            <Link
                                href="https://tiktok.com/@kaizen"
                                className="text-gray-400 hover:text-white transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74a2.89 2.89 0 0 1 2.31-4.64c.298 0 .593.057.87.168V9.07a6.37 6.37 0 0 0-1-.05A6.3 6.3 0 0 0 3 15.32a6.3 6.3 0 0 0 6.3 6.3a6.3 6.3 0 0 0 6.3-6.3V8.41a8.17 8.17 0 0 0 4.65 1.47v-3.2a4.83 4.83 0 0 1-3.66-.99z" />
                                </svg>
                                <span className="sr-only">TikTok</span>
                            </Link>
                        </div>
                    </div>

                    {/* Middle Column - About */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold mb-4">Tentang Kami</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Kaizen Network adalah server Minecraft yang fokus pada pengalaman bermain terbaik dengan fitur unik dan
                            komunitas yang ramah.
                        </p>
                    </div>

                    {/* Right Column - Links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold mb-4">Tautan Berguna</h3>
                        <nav className="flex flex-col space-y-2">
                            <Link href="/vote" className="text-gray-400 hover:text-white transition-colors">
                                Vote
                            </Link>
                            <Link href="/leaderboard" className="text-gray-400 hover:text-white transition-colors">
                                Papan Peringkat
                            </Link>
                            <Link href="/store" className="text-gray-400 hover:text-white transition-colors">
                                Toko
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800">
                    <div className="text-center py-6 text-sm text-gray-500">
                        © {new Date().getFullYear()} Kaizen Network. Tidak berafiliasi dengan Mojang AB.
                    </div>
                </div>
            </div>
        </footer>
    )
}

