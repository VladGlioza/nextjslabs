import { sql } from "@vercel/postgres";

export async function getAllCustomers() {
    const data = await sql`SELECT * FROM Customers`;
    return data.rows;
}
