import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Blue Moon Dog Walking",
	description:
		"Blue Moon Dog Walking is a professional dog walking service located in Maple Ridge, British Columbia.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className + " p-8"}>{children}</body>
		</html>
	);
}
