import { DefaultSession } from 'next-auth';

declare module 'next-auth/jwt' {
	interface JWT {
		id?: string;
	}
}

declare module 'next-auth' {
	interface Session {
		user: {
			/** The user's postal address. */
			id: string;
		} & DefaultSession['user'];
	}
}
