'use server';

import auth from '@/lib/auth';
import passwordUtils from '@/lib/password';
import userRepository from '@/repository/user';

type LoginPayload = {
	email: string;
	password?: string;
};
export async function login(payload: LoginPayload) {
	try {
		const { email, password } = payload;

		const existingUser = await userRepository.findByEmail(email);

		if (
			password &&
			existingUser?.password &&
			(await passwordUtils.isSame(password, existingUser.password))
		) {
			const token = auth.getToken({ id: existingUser?.id });

			return token;
		}

		throw new Error('Incorrect login data');
	} catch (e) {
		throw e;
	}
}

type RegisterPayload = {
	name: string;
	email: string;
	password?: string;
	image?: string;
};
export async function register(payload: RegisterPayload) {
	const { name, email, password, image } = payload;
	if (!name || !email) {
		return;
	}

	const existingUser = await userRepository.findByEmail(email);

	if (existingUser) {
		throw new Error('Email already exists!');
	}

	const data: { [key: string]: any } = {
		name,
		email,
		image,
	};
	if (password) {
		data.password = await passwordUtils.hash(password);
	}
	const newUser = await userRepository.create({
		data: data as any,
	});

	return newUser;
}
