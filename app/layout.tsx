import { Inter, Chivo_Mono } from "@next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    display: "optional"
});
const chivo_mono = Chivo_Mono({
    variable: "--font-chivo-mono",
    display: "optional"
});

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${chivo_mono.variable}`}>
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body>{children}</body>
        </html>
    );
}
