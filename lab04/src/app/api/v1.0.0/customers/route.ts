import { NextResponse } from "next/server";
import { getAllCustomers } from "@/utils/Customers";

export async function GET() {
    const data = await getAllCustomers();

    return NextResponse.json(data);
}
