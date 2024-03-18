import { NextResponse } from "next/server";

export const GET = async (request) => {
    return new NextResponse("Test message", { status: 200 });
}