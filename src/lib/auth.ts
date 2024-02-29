import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import passwordUtils from '@/lib/password';
import UserRepository from '@/repository/user';

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: '/',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text ',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (credentials?.email && credentials?.password) {
					const user = await UserRepository.findByEmail(credentials?.email);
					const isRightPassword = await passwordUtils.isSame(
						credentials.password,
						user?.password || ''
					);

					if (user && isRightPassword) {
						return user;
					}
				}

				return null;
			},
		}),
	],
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id!;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
			}

			return session;
		},
		async jwt({ token, user }) {
			let dbUser = await UserRepository.findByEmail(token.email!);

			if (!dbUser && token.email) {
				dbUser = await UserRepository.create({
					data: { email: token.email, name: token.name, image: token.picture },
				});
			}

			if (!dbUser) {
				return token;
			}

			return {
				id: dbUser?.id,
				name: dbUser?.name,
				email: dbUser?.email,
				picture: dbUser?.image,
			};
		},
	},
};
