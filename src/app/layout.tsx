import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const manrope = Manrope({
	variable: "--font-manrope",
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
				className={`${manrope.variable} antialiased`}
			>
				<ReactQueryProvider>
				<NuqsAdapter>
					{children}
				</NuqsAdapter>
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
