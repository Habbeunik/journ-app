import { entryRepository } from '@/repository/entry';

export async function POST(req: Request) {
	const body = await req.json();

	const { entryId, userId, entryText } = body;
	// Process a POST request
	if (!entryId && userId && entryText) {
		const entry = await entryRepository.create({ userId, text: entryText });

		return new Response(JSON.stringify({ message: 'Entry created!', entry }), {
			status: 200,
		});
	} else if (entryId && entryText) {
		const updatedEntry = await entryRepository.update({
			entryId,
			text: entryText,
		});

		return new Response(
			JSON.stringify({ message: 'Entry created!', entry: updatedEntry }),
			{ status: 200 }
		);
	}
}
