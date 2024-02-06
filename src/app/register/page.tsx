import {
	Box,
	Stack,
	Input,
	Button,
	FormControl,
	FormLabel,
	Typography,
	Divider,
} from '@mui/joy';
import Link from '@mui/joy/Link';
import NextLink from 'next/link';
import { CredentialResponse } from '@react-oauth/google';

import {
	loginOrRegisterGoogleUser,
	register,
} from '@/app/actions';
import AuthLayout from '@/components/Auth/AuthLayout';
import GoogleAuthButton from '@/components/Google/GoogleAuthButton';

export default function Register() {
	async function handleGoogleAuthSuccess({
		credential,
	}: CredentialResponse) {
		'use server';

		if (credential) {
			await loginOrRegisterGoogleUser(credential);
		}
	}

	async function handleGoogleAuthError() {
		'use server';
		console.log('error');
	}

	async function submit(formData: FormData) {
		'use server';

		try {
			const user = {
				email: formData.get('email')?.toString() || '',
				password:
					formData.get('password')?.toString() || '',
				name: formData.get('name')?.toString() || '',
			};

			await register(user);
		} catch (e) {
			console.log('ERror on Login)04-2304 ', e);
		}
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
					<Typography level="h3">Register</Typography>
					<Typography level="body-sm">
						Are you an existing user?{' '}
						<NextLink href="/" passHref>
							<Link level="title-sm">Sign in!</Link>
						</NextLink>
					</Typography>
					<GoogleAuthButton
						handleError={handleGoogleAuthError}
						handleSuccess={handleGoogleAuthSuccess}
					/>
					<Divider>or</Divider>
				</Stack>
				<Stack
					component={'form'}
					action={submit}
					direction="column"
					spacing={2}>
					<FormControl>
						<FormLabel>Full Name</FormLabel>
						<Input name="name" variant="outlined" />
					</FormControl>
					<FormControl>
						<FormLabel>Email</FormLabel>
						<Input name="email" variant="outlined" />
					</FormControl>
					<FormControl>
						<FormLabel>Password</FormLabel>
						<Input
							name="password"
							type="password"
							variant="outlined"
						/>
					</FormControl>
					<Button type="submit">Sign In</Button>
				</Stack>
			</AuthLayout>
		</Box>
	);
}
