import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'ksflsj9403DD!';

const auth = {
	getToken(payload: { [key: string]: any }) {
		return jwt.sign(payload, JWT_SECRET, {
			expiresIn: '5d',
		});
	},
	verifyToken(token: string) {
		return jwt.verify(token, JWT_SECRET);
	},
	decodeToken(token: string) {
		return jwt.decode(token);
	},
};

export default auth;
