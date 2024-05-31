import { sql } from "@vercel/postgres";

export async function PATCH(request: Request) {
    const formData = await request.formData();
    const id = formData.get("id")!.toString();
    const email = formData.get("email")!.toString();

    await sql`UPDATE Customers Set email=${email} WHERE id=${id}`;

    return new Response(`User with id: ${id} mail was changed to ${email}`, {
        status: 200,
    });
}
