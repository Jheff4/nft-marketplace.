import type { Metadata } from "next"
import { useEffect } from "react"
import "./globals.css"
import Header from "@/components/Header"
import { type ReactNode } from "react"
import { Providers } from "./providers"
import { useAccount } from "wagmi"

export const metadata: Metadata = {
    title: "NftMarketplace",
    description: "A non-custodial marketplace for NFTs",
}

export default function RootLayout(props: { children: ReactNode }) {
    const { address } = useAccount()

    useEffect(() => {
            if (address) { checkCompliance() }
        }, [address])
    
    async function checkCompliance() {
        if (!address) {
            const response = await fetch ("http://localhost:3000/api/check-compliance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    address,
                }),
            })
            const data = await response.json()
            console.log(data)
        }
    };

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/nft-marketplace.png" sizes="any" />
            </head>
            <body className="bg-zinc-50">
                <Providers>
                    <Header />
                    {props.children}
                </Providers>
            </body>
        </html>
    )
}
