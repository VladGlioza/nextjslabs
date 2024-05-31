import { Customers } from "@/components/Customers";

export default function Home() {
    console.log("Var WELCOME_STR: ", process.env.WELCOME_STR);
    return (
        <div className="flex flex-col">
            <span>Variable `WELCOME_STR`: {process.env.WELCOME_STR}</span>

            <Customers />
        </div>
    );
}
