import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-col items-center`}>
                <ChakraProvider>{children}</ChakraProvider>
            </body>
        </html>
    );
}