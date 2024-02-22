import { Box, Stack, Typography, Divider } from '@mui/joy';
import Link from '@mui/joy/Link';
import NextLink from 'next/link';

import { AuthLayout, LoginForm, GoogleSignIn } from '@/components/Auth';

export default function Home() {
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
					<Typography level="h3">Login</Typography>
					<Typography level="body-sm">
						Are you a new user?{' '}
						<NextLink href="/register" passHref>
							<Link level="title-sm"> Register!</Link>
						</NextLink>
					</Typography>
					<GoogleSignIn />
					<Divider>or</Divider>
					<LoginForm />
				</Stack>
			</AuthLayout>
		</Box>
	);
}
