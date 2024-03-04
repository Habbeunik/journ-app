import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const passwordUtils = {
	async hash(txt: string) {
		return bcrypt.hash(txt, SALT_ROUNDS);
	},
	async isSame(txt: string, hashTxt: string) {
		return bcrypt.compare(txt, hashTxt);
	},
};

export default passwordUtils;
