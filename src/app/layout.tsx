import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Dr Agenda",
	description: "Gerencie as consultas dos seus pacientes",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ReactQueryProvider>
				{children}
				</ReactQueryProvider>
				<Toaster
					position="top-right"
					richColors
					theme="light"
				/>
			</body>
		</html>
	);
}
