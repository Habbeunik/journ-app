import prisma from '@/lib/prisma';

export type Entry = Awaited<ReturnType<typeof prisma.entry.create>>;
