"use client"

import Image from "next/image"
import {Check, ChevronLeft, Copy, Loader2} from "lucide-react"
import React, {useEffect, useState} from "react"
import parse from "html-react-parser"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {findPayment, formatCurrency} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import Link from "next/link"
import { toast } from "sonner"

interface PaymentPageProps {
    params: Promise<{ reference: string }>
}

interface InstructionProps {
    title: string;
    steps: string[]
}

interface ResponseProps {
    reference: string;
    customer_name: string;
    amount: number;
    expired_time: number;
    payment_method: string;
    status: string;
    pay_code?: string | null;
    qr_url?: string | null;
    instructions: InstructionProps[]
}

export default function PaymentPage({params}: PaymentPageProps) {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [response, setResponse] = useState<ResponseProps>({
        reference: "",
        customer_name: "",
        amount: 0,
        expired_time: 0,
        payment_method: "",
        status: "",
        pay_code: "",
        qr_url: "",
        instructions: []
    });
    const [copied, setCopied] = useState<boolean>(false)
    const [timeLeft, setTimeLeft] = useState<number | string | null>(null)

    const search = React.use(params)
    const reference = search.reference

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch("/api/transaction/status", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({id: reference}),
                });

                const result = await response.json();
                setResponse(result.data);

                if (result.data?.expired_time) {
                    const now = Math.floor(Date.now() / 1000);
                    const remainingTime = result.data.expired_time - now;
                    setTimeLeft(remainingTime > 0 ? remainingTime : "Kadaluarsa");
                }
            } catch (error) {
                console.error("Gagal mengambil status transaksi:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus()
            .then(() => setLoading(false));
    }, [reference]);

    useEffect(() => {
        if (typeof timeLeft !== "number" || timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (typeof prevTime !== "number" || prevTime <= 1) {
                    clearInterval(interval);
                    return "Kadaluarsa";
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const copyToClipboard = (code?: string | null) => {
        if (typeof code === "string") {
            navigator.clipboard.writeText(code)
                .then(() => {
                    setCopied(true)
                    toast(
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
                                <Check className="w-4 h-4 text-black" />
                            </div>
                            <p className="text-center text-white">
                                Kode pembayaran disalin!
                            </p>
                        </div>,
                        {
                            style: {
                                backgroundColor: "#1f2937",
                                border: "none"
                            }
                        }
                    )
                });
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-400"/>
                <p className="text-center text-sm text-yellow-500 ml-2">Memuat...</p>
            </div>
        )
    }

    return response.status === "PAID" ? (
        <div className="min-h-screen bg-gray-900 pb-8">
            {/* Header */}
            <header className="sticky top-0 bg-900 backdrop-blur-sm border-b border-gray-800">
                <div className="container max-w-2xl mx-auto px-4">
                    <div className="h-14 flex items-center justify-between gap-4">
                        <Link href="/store" className="flex items-center gap-2 text-gray-400 hover:text-white">
                            <ChevronLeft className="w-5 h-5"/>
                            <span>Kembali ke Toko</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container max-w-2xl mx-auto px-4 py-8 space-y-6">
                {/* Success Message */}
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 text-green-500"/>
                    </div>
                    <h1 className="text-2xl font-bold">Pembayaran Berhasil!</h1>
                    <p className="text-gray-400">Premium Points akan segera ditambahkan ke akun Anda</p>
                </div>

                {/* Transaction Details */}
                <Card className="bg-gray-900/50 border-gray-800">
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">ID Transaksi</span>
                                <span>{response.reference}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Username</span>
                                <span>{response.customer_name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Premium Points</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-400">★</span>
                                    <span>80</span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Total Pembayaran</span>
                                <span>Rp{formatCurrency(response.amount)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Metode Pembayaran</span>
                                <span>{findPayment(response.payment_method)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Status</span>
                                <span className="text-green-500">Dibayar</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Next Steps */}
                <Card className="bg-gray-900/50 border-gray-800">
                    <CardContent className="pt-6">
                        <h2 className="font-semibold mb-4">Langkah Selanjutnya</h2>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <div
                                    className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                                    <span className="font-semibold">1</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-medium">Masuk ke Server Minecraft</p>
                                    <p className="text-sm text-gray-400">Gunakan IP: <span
                                        className="font-bold">play.kaizennetwork.net</span> untuk masuk ke server</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div
                                    className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                                    <span className="font-semibold">2</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-medium">Tunggu Beberapa Menit</p>
                                    <p className="text-sm text-gray-400">
                                        Premium Points akan otomatis ditambahkan ke akun Anda dalam beberapa menit
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div
                                    className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                                    <span className="font-semibold">3</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-medium">Claim Role Donatur</p>
                                    <p className="text-sm text-gray-400">
                                        Gunakan command <span className="font-bold">/discord link</span> di server
                                        minecraft untuk mendapatkan role Donatur di Discord
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Help Link */}
                <div className="text-center text-sm">
                    <p className="text-gray-400">
                        Ada masalah dengan transaksi Anda?{" "}
                        <a href="https://discord.gg/kaizen" className="text-yellow-400 hover:underline">
                            Hubungi kami di Discord
                        </a>
                    </p>
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-screen bg-gray-900 pb-8">
            {/* Header */}
            <header className="sticky top-0 bg-gray-900 backdrop-blur-sm">
                <div className="container max-w-2xl mx-auto px-4">
                    <div className="h-14 flex items-center justify-between gap-4">
                        <Link href="/store" className="flex items-center gap-2 text-gray-400 hover:text-white">
                            <ChevronLeft className="w-5 h-5"/>
                            <span>Kembali ke Toko</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container max-w-2xl mx-auto px-4 py-8 space-y-6">
                {/* Payment Status Card */}
                <Card className="bg-gray-800/50 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <CardTitle>Status Pembayaran</CardTitle>
                        {
                            response.status === "UNPAID" ? (
                                <span
                                    className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-medium">
                                    Belum Dibayar
                                </span>
                            ) : response.status === "EXPIRED" ? (
                                <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm font-medium">
                                    Kadaluarsa
                                </span>
                            ) : response.status === "PAID" ? (
                                <span
                                    className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-medium">
                                    Dibayar
                                </span>
                            ) : null
                        }
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Username</span>
                            <span>{response.customer_name}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-400">Jumlah</span>
                            <span>Rp{formatCurrency(response.amount)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Metode Pembayaran</span>
                            <span>{findPayment(response.payment_method)}</span>
                        </div>
                        {response.status !== "PAID" && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Sisa Waktu</span>
                                <div
                                    className={`flex items-center gap-1 ${typeof timeLeft === "number" ? "text-white" : "text-red-500"}`}>
                                    <span>
                                        {typeof timeLeft === "number"
                                            ? `${String(Math.floor(timeLeft / 3600)).padStart(2, "0")}:${String(
                                                Math.floor((timeLeft % 3600) / 60)
                                            ).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`
                                            : timeLeft}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-gray-400">Referensi</span>
                            <span className="font-mono text-gray-300">{search.reference}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Details Card */}
                <Card className="bg-gray-800/50 border-gray-800">
                    <CardHeader>
                        <CardTitle>Detail Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-center">
                            {response.payment_method === "QRISC" ? (
                                <div className="flex flex-col items-center justify-center p-6 rounded-2xl">
                                    {response.qr_url ? (
                                        <>
                                            <div className="bg-white p-3 rounded-xl shadow-lg">
                                                <Image
                                                    src={response.qr_url}
                                                    alt="QRIS QR Code"
                                                    width={288}
                                                    height={288}
                                                    className="h-[288px] w-[288px] object-contain rounded-lg"
                                                    draggable={false}
                                                    loading="lazy"
                                                />
                                            </div>
                                            <p className="mt-3 text-center text-sm font-medium text-black bg-white px-4 py-2 rounded-xl">
                                                Pindai kode QR ini dengan aplikasi e-wallet Anda
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-red-500">QR Code tidak tersedia</p>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Label>Kode Pembayaran</Label>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="flex-1 bg-gray-800/50 border md:w-[500] w-[300] border-gray-700 rounded-l-xl px-4 py-3 font-mono">
                                            {response.pay_code}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-12 w-24 bg-yellow-400 hover:bg-yellow-500 text-black border-0 rounded-r-xl"
                                            onClick={() => copyToClipboard(response.pay_code)}
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="h-4 w-4 mr-2"/>
                                                    <span className="text-sm">Salin</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-4 w-4 mr-2"/>
                                                    <span className="text-sm">Salin</span>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            {response.instructions.map((instruction, index) => (
                                <div key={index} className="space-y-4">
                                    <h3 className="font-medium">{instruction.title}</h3>
                                    <ol className="space-y-2 text-sm text-gray-400">
                                        {instruction.steps.map((step, stepIndex) => (
                                            <li key={stepIndex} className="flex gap-2">
                                                <span>{stepIndex + 1}.</span>
                                                <span>{parse(step)}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            ))}
                        </div>

                    </CardContent>
                </Card>

                {/* Help Link */}
                <div className="text-center text-sm">
                    <p className="text-gray-400">
                        Ada masalah dengan pembayaran Anda?{" "}
                        <a href="https://discord.gg/kaizen" className="text-yellow-400 hover:underline">
                            Gabung Discord kami untuk bantuan
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

