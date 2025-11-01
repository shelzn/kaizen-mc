"use client"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {ChevronLeft} from "lucide-react"
import {points} from "@/lib/product-list";
import {paymentMethods} from "@/lib/payment-list";
import React, {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { useRouter } from "next/navigation"
import Link from "next/link"

interface PurchasePageProps {
    params: Promise<{ id: string }>;
}

export default function PurchasePage({params}: PurchasePageProps) {
    const [username, setUsername] = useState("");
    const [payment, setPayment] = useState<string | null>(null);
    const [isBedrock, setBedrockPlayer] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const search = React.use(params)
    const product = points.find((item) => item.id === search.id)
    const price = product?.amount ? product?.amount * 1000 : 0

    const router = useRouter();

    const isButtonDisabled = username.trim() === "" || payment === null

    const handlePaymentProcess = async () => {
        setLoading(true)

        try {
            const response = await fetch('/api/transaction/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: search.id,
                    username: isBedrock ? `.${username}` : username,
                    method: payment,
                    price: price
                })
            })

            const result = await response.json();
            console.log(result)
            router.push(`/store/checkout/${result.data.reference}`)
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("An unknown error occurred");
            }
        }

    }

    return (
        <div className="container max-w-4xl mx-auto px-4 py-8">
            <Link
                href="/store"
                className="inline-flex items-center text-gray-400 hover:text-white mb-8 opacity-0 animate-fade-in"
            >
                <ChevronLeft className="w-5 h-5 mr-2"/>
                Kembali ke Toko
            </Link>

            {/* Product Details Card */}
            <Card className="bg-gray-800/50 border-gray-800 mb-6">
                <CardContent className="space-y-6 mt-6">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold">{product?.amount} Premium Points</h1>
                            <div
                                className="inline-block px-3 py-1 bg-yellow-500/20 rounded-[8] border border-yellow-500/30 text-yellow-500 font-medium">
                                Rp{price.toLocaleString("id-ID")}
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-medium px-4 py-2 rounded-lg">
                            <span className="text-xl">★</span>
                            <span>{product?.amount}</span>
                            <span>Premium Points</span>
                        </div>
                    </div>

                    <div className="space-y-4 text-gray-300">
                        <p>Dapatkan premium points untuk membuka fitur eksklusif dan mendukung server.</p>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex gap-3">
                                <span className="text-yellow-400">•</span>
                                <span>
                                    Donasi sebesar Rp{price.toLocaleString("id-ID")} untuk mendapatkan {product?.amount} Premium Points
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-yellow-400">•</span>
                                <span>Tunggu beberapa menit setelah pembayaran untuk mendapatkan Premium Points</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-yellow-400">•</span>
                                <span>
                                    Kamu bisa claim role Donatur di server discord dengan cara menyambungkan akun dengan command /discord
                                    link di server minecraft
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-yellow-400">•</span>
                                <span>Coba masuk ulang server jika Premium Points belum masuk</span>
                            </li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Payment Card */}
            <Card className="bg-gray-800/50 border-gray-800">
                <CardHeader>
                    <CardTitle>Bayar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="username">Username Minecraft</Label>
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Masukkan username Minecraft Anda"
                                className="bg-gray-800/50 border-gray-700"
                            />
                            {username && isBedrock && (
                                <p className="text-sm text-gray-400">
                                    Your username will be sent as: <span className="text-yellow-400">.{username}</span>
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-3 md:self-start md:pt-[34px]">
                            <Label htmlFor="bedrock" className="cursor-pointer order-1 md:order-none whitespace-nowrap">
                                Bedrock Edition
                            </Label>
                            <Switch
                                id="bedrock"
                                checked={isBedrock}
                                onCheckedChange={setBedrockPlayer}
                                className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Metode Pembayaran</Label>
                        <Select onValueChange={(value) => setPayment(value)}>
                            <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                                <SelectValue placeholder="Pilih metode pembayaran"/>
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 w-[calc(100vw-2rem)] md:w-[500px]">
                                <SelectGroup>
                                    <SelectLabel className="font-semibold italic">E-wallets</SelectLabel>
                                    {paymentMethods.ewallets.map((method) => (
                                        <SelectItem key={method.id} value={method.id} className="hover:bg-gray-700">
                                            <div className="flex items-center gap-3 ml-2">
                                                <span>{method.name}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>

                                <SelectGroup>
                                    <SelectLabel className="font-semibold italic">Virtual Accounts</SelectLabel>
                                    {paymentMethods.virtualAccounts.map((method) => (
                                        <SelectItem key={method.id} value={method.id} className="hover:bg-gray-700">
                                            <div className="flex items-center gap-3 ml-2">
                                                <span>{method.name}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>

                                <SelectGroup>
                                    <SelectLabel className="font-semibold italic">Retail Stores</SelectLabel>
                                    {paymentMethods.retailStores.map((method) => (
                                        <SelectItem key={method.id} value={method.id} className="hover:bg-gray-700">
                                            <div className="flex items-center gap-3 ml-2">
                                                <span>{method.name}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                    </div>

                    <Button
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black h-12 text-lg rounded-xl"
                        disabled={isLoading || isButtonDisabled}
                        onClick={() => handlePaymentProcess()}
                    >
                        {isLoading ? "Processing..." : "Bayar"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

