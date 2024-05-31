"use client";

import { Fragment } from "react";
import { useEffect, useState } from "react";
import { CustomerProps } from "@/types/Customers";

export const Customers = () => {
    const [customers, setCustomers] = useState<CustomerProps[] | null>(null);

    useEffect(() => {
        fetch(`/api/v1.0.0/customers`)
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data);
            });
    }, []);
    return (
        <div>
            <span>
                Variable `NEXT_PUBLIC_CUSTOMERS`:{" "}
                {process.env.NEXT_PUBLIC_CUSTOMERS}
            </span>
            <div>
                {customers ? (
                    <Fragment>
                        {customers.map((customer) => {
                            return (
                                <div
                                    className="flex flex-col py-3"
                                    key={customer.id}
                                >
                                    <span>Name: {customer.name}</span>
                                    <span>Email: {customer.email}</span>
                                </div>
                            );
                        })}
                    </Fragment>
                ) : (
                    <span>Loading..</span>
                )}
            </div>
        </div>
    );
};
