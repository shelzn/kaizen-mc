"use client";

import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {Home, Trophy, CheckSquare, ShoppingCart, GamepadIcon, Menu, Check} from "lucide-react";
import { DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {toast} from "sonner";
import Link from "next/link";

export function SiteHeader() {

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
        <div className="fixed top-0 left-0 right-0 flex justify-center p-4 z-50 opacity-0 animate-fade-in">
            <header className="flex h-14 w-full max-w-[1200px] items-center justify-between rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm px-4">
                {/* Logo and Brand - Always visible */}
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/logo.webp" alt="Kaizen Network" width={190} height={50} className="rounded" draggable={false} />
                </Link>

                {/* Desktop Navigation - Hidden on mobile */}
                <nav className="hidden md:flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-200 transition-colors hover:bg-gray-800">
                        <Home className="h-5 w-5" />
                        <span>Beranda</span>
                    </Link>
                    <Link href="/leaderboard" className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-200 transition-colors hover:bg-gray-800">
                        <Trophy className="h-5 w-5" />
                        <span>Papan Peringkat</span>
                    </Link>
                    <Link href="/vote" className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-200 transition-colors hover:bg-gray-800">
                        <CheckSquare className="h-5 w-5" />
                        <span>Vote</span>
                    </Link>
                    <Link href="/store" className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-200 transition-colors hover:bg-gray-800">
                        <ShoppingCart className="h-5 w-5" />
                        <span>Toko</span>
                    </Link>
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    {/* Play Now Button - Hidden on mobile */}
                    <Button
                        className="hidden md:flex font-semibold items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl"
                        onClick={handleCopyIp}
                    >
                        <GamepadIcon className="h-5 w-5" />
                        Main Sekarang
                    </Button>

                    {/* Language Selector */}
                    {/* <button onClick={handleLanguage} disabled={isPending} className="flex items-center gap-2">
                        <Image
                            src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${locale === 'en' ? "gb" : "id"}.svg`}
                            alt={locale === 'en' ? "English" : "Indonesia"}
                            width={24}
                            height={16}
                            className="h-4 w-6"
                        />
                        <span className="text-sm font-medium">
                            {locale === 'en' ? "EN" : "ID"}
                        </span>
                    </button> */}

                    {/* Mobile Menu Button - Only visible on mobile */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-xl md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] bg-gray-900 border-gray-800 p-0">
                            {/* Tambahkan DialogTitle agar aksesibilitas terpenuhi */}
                            <DialogTitle asChild>
                                <VisuallyHidden>Menu Navigasi</VisuallyHidden>
                            </DialogTitle>

                            <nav className="flex flex-col gap-2 p-4">
                                <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 transition-colors hover:bg-gray-800">
                                    <Home className="h-5 w-5" />
                                    <span>Beranda</span>
                                </Link>
                                <Link href="/leaderboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 transition-colors hover:bg-gray-800">
                                    <Trophy className="h-5 w-5" />
                                    <span>Papan Peringkat</span>
                                </Link>
                                <Link href="/vote" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 transition-colors hover:bg-gray-800">
                                    <CheckSquare className="h-5 w-5" />
                                    <span>Vote</span>
                                </Link>
                                <Link href="/store" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 transition-colors hover:bg-gray-800">
                                    <ShoppingCart className="h-5 w-5" />
                                    <span>Toko</span>
                                </Link>
                                <Button
                                    className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg"
                                    onClick={handleCopyIp}
                                >
                                    <GamepadIcon className="mr-2 h-5 w-5" />
                                    Main Sekarang
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>
        </div>
    );
}
