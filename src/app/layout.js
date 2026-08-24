import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "S&P Store",
  description: "Online Clothing Store",
};


export default function RootLayout({ children }) {

  return (
    <html lang="fa">

      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >

        <CartProvider>

          <FavoritesProvider>
            {children}
          </FavoritesProvider>

        </CartProvider>

      </body>

    </html>
  );
}