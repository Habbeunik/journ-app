import prisma from '@/lib/prisma';
import { entryRepository } from '@/repository/entry';

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const entry = await entryRepository.getById(params.id);

	return new Response(JSON.stringify({ message: 'Entry fetched!', entry }), {
		status: 200,
	});
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await entryRepository.delete(params.id);

	return new Response(JSON.stringify({ message: 'Entry Deleted!' }), {
		status: 200,
	});
}
