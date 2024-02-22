import * as jwt from 'jsonwebtoken';

class AuthLib {
	static secret = process.env.NEXTAUTH_SECRET || '';

	static getToken(payload: { [key: string]: any }) {
		return jwt.sign(payload, this.secret, {
			expiresIn: '5d',
		});
	}

	static verifyToken(token: string) {
		return jwt.verify(token, this.secret);
	}

	static decodeToken(token: string) {
		return jwt.decode(token);
	}
}

export default AuthLib;
