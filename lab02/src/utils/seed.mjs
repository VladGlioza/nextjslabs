import postgres from "postgres";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const conn = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: "require",
});

const customers = [
    {
        id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
        name: "Delba de Oliveira",
        email: "delba@oliveira.com",
        image_url: "/customers/delba-de-oliveira.png",
    },
    {
        id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
        name: "Lee Robinson",
        email: "lee@robinson.com",
        image_url: "/customers/lee-robinson.png",
    },
    {
        id: "3958dc9e-737f-4377-85e9-fec4b6a6442a",
        name: "Hector Simpson",
        email: "hector@simpson.com",
        image_url: "/customers/hector-simpson.png",
    },
    {
        id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
        name: "Steven Tey",
        email: "steven@tey.com",
        image_url: "/customers/steven-tey.png",
    },
    {
        id: "3958dc9e-787f-4377-85e9-fec4b6a6442a",
        name: "Steph Dietz",
        email: "steph@dietz.com",
        image_url: "/customers/steph-dietz.png",
    },
    {
        id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
        name: "Michael Novotny",
        email: "michael@novotny.com",
        image_url: "/customers/michael-novotny.png",
    },
    {
        id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
        name: "Evil Rabbit",
        email: "evil@rabbit.com",
        image_url: "/customers/evil-rabbit.png",
    },
    {
        id: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66",
        name: "Emil Kowalski",
        email: "emil@kowalski.com",
        image_url: "/customers/emil-kowalski.png",
    },
    {
        id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
        name: "Amy Burns",
        email: "amy@burns.com",
        image_url: "/customers/amy-burns.png",
    },
    {
        id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
        name: "Balazs Orban",
        email: "balazs@orban.com",
        image_url: "/customers/balazs-orban.png",
    },
];

const users = [
    {
        id: "f820c849-b482-46c9-8088-4c921c9e5cf9",
        name: "John",
        surname: "Doe",
        email: "user@nextmail.com",
        password: "123456",
    },
    {
        id: "35e4da58-101c-47e8-9668-1581db652d7c",
        name: "Sam",
        surname: "Wilson",
        email: "josie@mail.com",
        password: "sSD2s)_=saMs",
    },
    {
        id: "197b9afd-f132-4247-a5cb-a9b99460e20e",
        name: "Anna",
        surname: "Doe",
        email: "anna@mail.com",
        password: '@sdac_-+":x1s1c3',
    },
    {
        id: "26ef32d4-a632-4010-8bf7-55151d438e76",
        name: "Dan",
        surname: "David",
        email: "dan@gmail.com",
        password: "SDA<MOKLOscs1",
    },
    {
        id: "240a8e5d-22e7-4fc1-8095-2983fe1d09d8",
        name: "David",
        surname: "Kowalski",
        email: "david2918@gmail.com",
        password: "sDI(0@00as",
    },
];

async function seedUsers() {
    try {
        await conn`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await conn`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255),
                surname VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `;

        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                return conn`
                    INSERT INTO users (id, name, surname, email, password)
                    VALUES (${user.id}, ${user.name}, ${user.surname}, ${user.email}, ${user.password})
                    ON CONFLICT (id) DO NOTHING;
                `;
            })
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error("Error seeding users:", error);
        throw error;
    }
}

async function seedCustomers() {
    try {
        await conn`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await conn`
			CREATE TABLE IF NOT EXISTS customers (
			id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			email VARCHAR(255) NOT NULL,
			image_url VARCHAR(255) NOT NULL
			);
		`;

        const insertedCustomers = await Promise.all(
            customers.map(
                (customer) => conn`
					INSERT INTO customers (id, name, email, image_url)
					VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
					ON CONFLICT (id) DO NOTHING;
				`
            )
        );

        console.log(`Seeded ${insertedCustomers.length} customers`);

        return {
            createTable,
            customers: insertedCustomers,
        };
    } catch (error) {
        console.error("Error seeding customers:", error);
        throw error;
    }
}

async function main() {
    //const client = await db.connect();

    await seedUsers();
    await seedCustomers();
}

main();
