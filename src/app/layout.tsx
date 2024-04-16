import type { Metadata } from 'next';
import Head from 'next/head';
import { Inter } from 'next/font/google';

import '@fontsource/inter';
import './globals.css';
import AppProviders from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'JournApp',
	description:
		'a simple journaling web app built with Next.js. It allows users to create journal entries with text, images and tags',
	authors: {
		name: 'Abbey Kumapayi',
	},
	creator: 'Abbey Kumapayi',
	icons: '/favicon.ico',
	manifest: '/manifest.json',
	themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
	viewport:
		'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Head>
				<title>JournApp</title>
				<meta name="description" content="" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AppProviders>
				<body className={inter.className}>{children}</body>
			</AppProviders>
		</html>
	);
}
