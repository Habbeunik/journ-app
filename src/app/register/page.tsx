import { Box, Stack, Typography, Divider } from '@mui/joy';
import Link from '@mui/joy/Link';
import NextLink from 'next/link';

import AuthLayout from '@/components/Auth/AuthLayout';
import { GoogleSignIn, RegisterForm } from '@/components/Auth';

export default function Register() {
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
							<Link level="title-sm">Login!</Link>
						</NextLink>
					</Typography>
					<GoogleSignIn />
					<Divider>or</Divider>

					<RegisterForm />
				</Stack>
			</AuthLayout>
		</Box>
	);
}
