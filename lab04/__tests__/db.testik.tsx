import { sql } from "@vercel/postgres";
import { getAllCustomers } from "@/utils/Customers";
import { customers } from "@/mocks/customers";

jest.mock("@vercel/postgres", () => {
    const sql = jest.fn(() => ({ rows: [] }));
    return {
        sql,
    };
});

describe("db", () => {
    it('getCustomers returns empty "rows" array from sql()', async () => {
        const result = await getAllCustomers();
        expect(result.length).toBe(0);
    });

    it("getCustomers returns correct number of elements from sql()", async () => {
        const mockedSql = sql as unknown as jest.Mock<any, any>;
        mockedSql.mockReturnValue({ rows: [...customers] });
        const result = await getAllCustomers();
        expect(result.length).toBe(customers.length);
    });
});
