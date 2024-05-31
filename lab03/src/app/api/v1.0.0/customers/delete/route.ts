import { sql } from "@vercel/postgres";

export async function DELETE(request: Request) {
    const formData = await request.formData();
    const id = formData.get("id")!.toString();

    await sql`DELETE FROM Customers WHERE id=${id}`;

    return new Response(`User with id: ${id} was deleted`, { status: 200 });
}
