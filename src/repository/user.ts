import prisma from '@/lib/prisma';
import { today } from '@/lib/date';

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

	static async findUserTodayEntry(userId: string) {
		const entries = await prisma.entry.findMany({
			where: {
				userId,
				createdAt: {
					gte: today(),
				},
			},
			orderBy: [{ createdAt: 'desc' }],
		});

		return entries[0];
	}

	static findOtherEntries(userId: string) {
		return prisma.entry.findMany({
			where: {
				userId,
				createdAt: {
					lte: today(),
				},
			},
			orderBy: [{ createdAt: 'desc' }],
		});
	}
}
