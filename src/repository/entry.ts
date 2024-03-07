import prisma from '@/lib/prisma';

export const entryRepository = {
	create(payload: { userId: string; text: string }) {
		return prisma.entry.create({ data: payload });
	},

	update(payload: { entryId: string; text: string }) {
		return prisma.entry.update({
			where: { id: payload.entryId },
			data: { text: payload.text },
		});
	},

	delete(id: string) {
		return prisma.entry.delete({
			where: { id },
		});
	},

	getById(id: string) {
		return prisma.entry.findUnique({
			where: { id },
		});
	},
};
