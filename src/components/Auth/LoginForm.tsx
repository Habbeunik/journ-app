'use client';

import React from 'react';
import {
	Stack,
	Input,
	Button,
	FormControl,
	FormLabel,
	Checkbox,
	Snackbar,
} from '@mui/joy';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { isEmailCorrect } from '@/lib/form';

const LoginForm = () => {
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');

	const [isLogginIn, setIsLogginIn] = React.useState<boolean>(false);
	const [error, setError] = React.useState<boolean>(false);

	const router = useRouter();

	const formIsValid =
		Boolean(email) && Boolean(password) && isEmailCorrect(email);

	async function submit(e: React.FormEvent<HTMLFormElement>) {
		try {
			e.preventDefault();
			setIsLogginIn(true);
			setError(false);

			const signInPayload = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});
			setIsLogginIn(false);

			if (signInPayload?.ok) {
				router.push('/app');
			} else {
				setError(true);
			}
		} catch (e) {
			setIsLogginIn(false);
			setError(true);
		}
	}

	return (
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
				<Button loading={isLogginIn} disabled={!formIsValid} type="submit">
					Login
				</Button>
			</Stack>
			<Snackbar
				open={error}
				variant="soft"
				color="danger"
				autoHideDuration={5000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				onClose={() => setError(false)}
				endDecorator={
					<Button
						onClick={() => setError(false)}
						size="sm"
						variant="soft"
						color="danger">
						Dismiss
					</Button>
				}>
				Cannot login at this moment. Please check your credentials and try
				again.
			</Snackbar>
		</form>
	);
};

export default LoginForm;
