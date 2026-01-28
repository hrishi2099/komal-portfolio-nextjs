import { Geist, Geist_Mono } from "next/font/google";
import "./main.css"; // Updated import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Komal - Architect & Interior Designer",
  description: "Portfolio of Komal, an Architect and Interior Designer specializing in modern luxury and sustainable living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`} 
      >
        {children}
      </body>
    </html>
  );
}
