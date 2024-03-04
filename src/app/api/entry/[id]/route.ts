import prisma from '@/lib/prisma';

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const entry = await prisma.entry.findUnique({ where: { id: params.id } });

	return new Response(JSON.stringify({ message: 'Entry fetched!', entry }), {
		status: 200,
	});
}
