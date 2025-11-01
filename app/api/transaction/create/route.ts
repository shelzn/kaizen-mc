import crypto from "crypto";
import { generateId } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY as string;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;
const MERCHANT_CODE = process.env.NEXT_PUBLIC_MERCHANT_CODE as string;

export async function POST(request: NextRequest) {
    try {
        const { productId, username, method, price } = await request.json();

        if (!productId || !username || !method || !price) {
            return NextResponse.json({
                status: 400,
                message: "Invalid request data."
            }, { status: 400 })
        }

        const MERCHANT_REF: string = generateId().toString();
        const signature = crypto
            .createHmac('sha256', PRIVATE_KEY)
            .update(MERCHANT_CODE + MERCHANT_REF + price)
            .digest('hex');

        const expired = parseInt(String(Math.floor(Date.now() / 1000) + (60 * 60)))

        const parameter = {
            method: method,
            merchant_ref: MERCHANT_REF,
            amount: price,
            customer_name: username,
            customer_email: `${username.replace(/\./g, "").replace(/\s+/g, "_")}@kaizenmc.id`,
            order_items: [{
                name: productId,
                price: price,
                quantity: 1
            }],
            expired_time: expired,
            signature: signature
        }

        const response = await fetch('https://tripay.co.id/api-sandbox/transaction/create', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parameter)
        });

        const result = await response.json();
        console.log(result)

        // await prisma.transaction.create({
        //     data: {
        //         reference: result.data.reference,
        //         merchant_ref: result.data.merchant_ref,
        //         nickname: result.data.customer_name,
        //         amount: result.data.amount,
        //         method: result.data.payment_method,
        //         qr_url: result.data.qr_url,
        //         pay_code: result.data.pay_code,
        //         status: result.data.status,
        //         expired_time: result.data.expired_time,
        //     }
        // })

        return NextResponse.json({
            status: 200,
            message: 'Transaction created successfully',
            data: result.data
        }, { status: 200 })

    } catch(error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                status: 500,
                message: error.message || "An error occurred"
            })
        } else {
            return NextResponse.json({
                status: 500,
                message: "An unknown error occurred"
            })
        }
    }
}