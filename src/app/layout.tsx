import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/myui/Header";
import Footer from "@/components/myui/Footer";

export const metadata: Metadata = {
	title: "Postcode Stats API",
	description: "A UI for the Postcode Stats API",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased flex flex-col min-h-screen bg-background">
				<Header />
				<main className="flex-grow">
					<div className="container mx-auto p-4 lg:p-6">{children}</div>
				</main>
				<Footer />
			</body>
		</html>
	);
}
