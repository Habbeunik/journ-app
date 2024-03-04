import UserRepository from '@/repository/user';

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const entry = await UserRepository.findUserTodayEntry(params.id);

	return new Response(JSON.stringify({ message: 'Entry fetched!', entry }), {
		status: 200,
	});
}
