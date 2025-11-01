import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY as string;

export async function POST(request: NextRequest) {
    try {
        const json = await request.json();
        const signature = request.headers.get("X-Callback-Signature");

        const computedSignature = crypto.createHmac("sha256", PRIVATE_KEY)
            .update(JSON.stringify(json))
            .digest("hex")

        if (signature !== computedSignature) {
            return NextResponse.json({
                status: 400,
                message: "Invalid signature.",
            }, { status: 400 })
        }

        const status = json.status
        const reference = json.reference

        // await prisma.transaction.update({
        //     where: {
        //         reference
        //     },
        //     data: {
        //         status
        //     }
        // })

        return NextResponse.json({
            status: 200,
            message: "Callback called"
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