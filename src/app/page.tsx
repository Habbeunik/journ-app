'use client';

import { useState } from 'react';
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
import { useRouter } from 'next/navigation';
import { getSession, signIn } from 'next-auth/react';

import GoogleAuthButton from '@/components/Google/GoogleAuthButton';
import AuthLayout from '@/components/Auth/AuthLayout';

export default function Home() {
	const [email, setEmail] = useState<string>('emeka@gmail.com');
	const [password, setPassword] = useState<string>('password');
	const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

	const router = useRouter();

	const isValid =
		Boolean(email) &&
		Boolean(password) &&
		/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

	async function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsSigningIn(true);

		const signInPayload = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});
		setIsSigningIn(false);

		if (signInPayload?.ok) {
			setTimeout(async function () {
				console.log('sesh on login', await getSession());
			}, 3000);
			router.push('/app');
		}

		console.log('sign in payload', signInPayload);
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

				<form onSubmit={submit}>
					<Stack direction="column" spacing={2}>
						<FormControl>
							<FormLabel>Email</FormLabel>
							<Input
								variant="outlined"
								name="email"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setEmail(e.target.value);
								}}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Password</FormLabel>
							<Input
								name="password"
								type="password"
								variant="outlined"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setPassword(e.target.value);
								}}
							/>
						</FormControl>
						<Checkbox
							size="sm"
							label="Remember me"
							name="persistent"
							sx={{ textAlign: 'left' }}
						/>
						<Button loading={isSigningIn} disabled={!isValid} type="submit">
							Sign In
						</Button>
					</Stack>
				</form>
			</AuthLayout>
		</Box>
	);
}
