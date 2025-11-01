import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center px-4">
            <div className="text-center space-y-6">
                <h1 className="text-[200px] font-bold leading-none text-yellow-400">404</h1>
                <h2 className="text-4xl font-bold">Halaman Tidak Ditemukan</h2>
                <p className="text-gray-400 max-w-lg mx-auto">
                    Halaman yang Anda cari mungkin telah dihapus atau sedang tidak tersedia.
                </p>
                <Link href="/">
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black h-12 mt-6 px-8 text-lg">Kembali ke Beranda</Button>
                </Link>
            </div>
        </div>
    )
}

