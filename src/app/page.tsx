'use client';

import {
	Box,
	Stack,
	Input,
	Button,
	FormControl,
	FormLabel,
	Typography,
	Divider,
	Checkbox,
} from '@mui/joy';
import Link from '@mui/joy/Link';
import NextLink from 'next/link';
import {
	useSession,
	signIn,
	signOut,
} from 'next-auth/react';

import GoogleAuthButton from '@/components/Google/GoogleAuthButton';
import AuthLayout from '@/components/Auth/AuthLayout';
import { CredentialResponse } from '@react-oauth/google';
import {
	login,
	loginOrRegisterGoogleUser,
	verifyGoogleToken,
} from './actions';

export default function Home() {
	// async function handleGoogleAuthSuccess({
	// 	credential,
	// }: CredentialResponse) {
	// 	'use server';

	// 	if (credential) {
	// 		loginOrRegisterGoogleUser(credential);
	// 	}
	// }

	// async function handleGoogleAuthError() {
	// 	// 'use server';
	// 	console.log('error');
	// }

	async function submit(e) {
		try {
			e.preventDefault();

			signIn('credentials', {
				email: 'habbs@gams.com',
				password: 'passes',
			});
			// await login(user);
		} catch (e) {
			console.log('ERror on Login)04-2304 ', e);
		}

		// mutate data
		// revalidate cache
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '6rem',
				minHeight: '100vh',
			}}>
			<AuthLayout>
				<Stack spacing={2}>
					<Typography level="h3">Sign in</Typography>
					<Typography level="body-sm">
						Are you a new user?{' '}
						<NextLink href="/register" passHref>
							<Link level="title-sm"> Sign up!</Link>
						</NextLink>
					</Typography>
					<GoogleAuthButton
						handleError={function () {}}
						handleSuccess={function () {}}
					/>
					<Divider>or</Divider>
				</Stack>
				<Stack
					component="form"
					onSubmit={submit}
					direction="column"
					spacing={2}>
					<FormControl>
						<FormLabel>Email</FormLabel>
						<Input variant="outlined" name="email" />
					</FormControl>
					<FormControl>
						<FormLabel>Password</FormLabel>
						<Input
							name="password"
							type="password"
							variant="outlined"
						/>
					</FormControl>
					<Checkbox
						size="sm"
						label="Remember me"
						name="persistent"
						sx={{ textAlign: 'left' }}
					/>
					<Button type="submit">Sign In</Button>
				</Stack>
			</AuthLayout>
		</Box>
	);
}
