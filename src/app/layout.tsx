import type { Metadata } from "next";
import "./globals.css";
import WalletConnectionProvider from "@/components/PhantomConnect/PhantomConnect";
import Navbar from "./Navbar/Navbar";
import ClientInit from "@/components/ClientInit";

export const metadata: Metadata = {
  title: "RentalHive – Web3 Property Rentals",
  description: "Decentralized rentals powered by Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientInit />
        <WalletConnectionProvider>
          <Navbar />
          <main className="p-6 max-w-6xl mx-auto">{children}</main>
        </WalletConnectionProvider>
      </body>
    </html>
  );
}
