import prisma from '@/lib/prisma';

export default class UserRepository {
	static findByEmail(email: string) {
		return prisma.user.findUnique({
			where: {
				email,
			},
		});
	}

	static create(...args: Parameters<typeof prisma.user.create>) {
		return prisma.user.create(...args);
	}
}
