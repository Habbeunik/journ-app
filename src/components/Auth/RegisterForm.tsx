'use client';

import React from 'react';
import { Stack, Input, Button, FormControl, FormLabel, Snackbar } from '@mui/joy';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { register } from '@/app/actions';
import { isEmailCorrect } from '@/lib/form';

const RegisterForm = () => {
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [name, setName] = React.useState<string>('');

	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string>('');
	const router = useRouter();

	const formIsValid = Boolean(email) && Boolean(password) && Boolean(name) && isEmailCorrect(email);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setError('');
		setIsSubmitting(true);

		try {
			await register({ name, email, password });
			const signInPayload = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});

			if (signInPayload?.ok) {
				router.replace('/app');
			}
		} catch (e: Error | any) {
			setError(e.message);
		}
		setIsSubmitting(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack direction="column" spacing={2}>
				<FormControl>
					<FormLabel>Full Name</FormLabel>
					<Input
						name="name"
						variant="outlined"
						size="lg"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Email</FormLabel>
					<Input
						name="email"
						size="lg"
						variant="outlined"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Password</FormLabel>
					<Input
						name="password"
						size="lg"
						type="password"
						variant="outlined"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</FormControl>
				<Button size="lg" loading={isSubmitting} type="submit" disabled={!formIsValid}>
					Register
				</Button>
			</Stack>
			<Snackbar
				open={Boolean(error)}
				variant="soft"
				color="danger"
				autoHideDuration={5000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				onClose={() => setError('')}
				endDecorator={
					<Button onClick={() => setError('')} size="sm" variant="soft" color="danger">
						Dismiss
					</Button>
				}>
				{error}
			</Snackbar>
		</form>
	);
};

export default RegisterForm;
