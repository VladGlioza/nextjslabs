import React from "react";
import { SigninForm } from "@/components/SignInForm";

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center ">
            <div className="flex flex-col items-center space-y-2 p-3 ">
                <SigninForm />
            </div>
        </main>
    );
}
