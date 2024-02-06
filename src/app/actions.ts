'use server';

import auth from '@/lib/auth';
import googleOAuth2 from '@/lib/google';
import passwordUtils from '@/lib/password';
import userRepository from '@/repository/user';
import { CreateUserType, User } from '@/types';

async function verifyGoogleToken(token: string) {
	try {
		const ticket = await googleOAuth2.verifyIdToken({
			idToken: token,
		});

		return ticket.getPayload();
	} catch (e) {
		throw e;
	}
}

export async function loginOrRegisterGoogleUser(
	token: string
) {
	try {
		const googleUser = await verifyGoogleToken(token);

		if (!googleUser || !googleUser.email) {
			throw new Error('No payload available');
		}

		const existingUser = await userRepository.findByEmail(
			googleUser.email
		);
		if (existingUser) {
			const token = auth.getToken({ id: existingUser.id });
			console.log('GOOGLE USER LOGIN +===+++', token);
			return token;
		}

		return await register({
			name: `${googleUser.given_name} ${googleUser.family_name}`,
			email: googleUser.email,
			image: googleUser.picture,
		});
	} catch (e) {
		throw e;
	}
}

type LoginPayload = {
	email: string;
	password?: string;
};
export async function login(payload: LoginPayload) {
	try {
		const { email, password } = payload;

		const existingUser = await userRepository.findByEmail(
			email
		);

		if (
			password &&
			existingUser?.password &&
			(await passwordUtils.isSame(
				password,
				existingUser.password
			))
		) {
			const token = auth.getToken({ id: existingUser?.id });
			console.log('USER LOGIN +===+++', token);

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

	const existingUser = await userRepository.findByEmail(
		email
	);

	if (existingUser) {
		throw new Error('User already exists!!!');
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
	const token = auth.getToken({ id: newUser?.id });
	console.log('REG NEW USER +===+++', token);

	return token;
}
