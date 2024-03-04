'use client';

import { Inter } from 'next/font/google';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy';

import '@fontsource/inter';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<CssBaseline />
			<CssVarsProvider>
				<SessionProvider>
					<body className={inter.className}>{children}</body>
				</SessionProvider>
			</CssVarsProvider>
		</html>
	);
}
