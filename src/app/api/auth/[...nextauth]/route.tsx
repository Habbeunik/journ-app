import passwordUtils from '@/lib/password';
import userRepository from '@/repository/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	providers: [
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
					const user = await userRepository.findByEmail(credentials?.email);
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
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
			}

			return session;
		},
		async jwt({ token, user }) {
			const dbUser = await userRepository.findByEmail(token.email!);

			return {
				id: dbUser?.id,
				name: dbUser?.name,
				email: dbUser?.email,
				picture: dbUser?.image,
			};
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
