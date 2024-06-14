'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@mui/joy';
import GoogleIcon from './GoogleIcon';

const GoogleSignIn = () => {
	return (
		<Button
			variant="soft"
			color="neutral"
			fullWidth
			size="lg"
			startDecorator={<GoogleIcon />}
			onClick={() => {
				signIn('google', { callbackUrl: '/app' });
			}}>
			Continue with Google
		</Button>
	);
};

export default GoogleSignIn;
