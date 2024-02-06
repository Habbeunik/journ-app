import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Username',
					type: 'text ',
					placeholder: 'jsmith',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				console.log('credentials', credentials);
				console.log('Req', req);

				return {
					id: 'q3w23',
					email: 'habbeyunik@gmail.como',
				};
			},
		}),
	],
});
