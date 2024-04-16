'use client';

import React from 'react';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy';
import { getInitColorSchemeScript } from '@mui/joy/styles';
import { SessionProvider } from 'next-auth/react';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<React.Fragment>
			<CssBaseline />
			<CssVarsProvider>
				<SessionProvider>
					{getInitColorSchemeScript({ defaultMode: 'system' })}
					{children}
				</SessionProvider>
			</CssVarsProvider>
		</React.Fragment>
	);
};

export default AppProviders;
