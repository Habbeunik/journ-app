import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy';

import '@fontsource/inter';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
};

export const metadata: Metadata = {
	title: 'Journ App',
	description: 'Journal next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<CssBaseline />
			<CssVarsProvider>
				<body className={inter.className}>{children}</body>
			</CssVarsProvider>
		</html>
	);
}
