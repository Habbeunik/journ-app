'use server';

import passwordUtils from '@/lib/password';
import userRepository from '@/repository/user';

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
