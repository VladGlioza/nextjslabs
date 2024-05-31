import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    console.log(data);

    const name = data.get("name");
    const surname = data.get("surname");
    const mail = data.get("email")?.toString();
    const photoUrl = `/customers/${name}-${surname}.png`;
    const customerName = `${name} ${surname}`;

    await sql`INSERT INTO Customers (name, email, image_url) VALUES(${customerName}, ${mail}, ${photoUrl})`;
    return new Response(`Added new customer`, { status: 200 });
}
