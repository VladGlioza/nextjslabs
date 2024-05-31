"use client";

import { signIn } from "next-auth/react";

export const SigninForm = () => {
    return (
        <div className="flex gap-4 justify-between">
            <button
                onClick={() => signIn("github")}
                className="mt-4 w-full !bg-white !text-black !justify-center"
            >
                GitHub
            </button>
            <button
                onClick={() => signIn("google", {})}
                className="mt-4 w-full !bg-white !text-black !justify-center"
            >
                Google
            </button>
        </div>
    );
};
