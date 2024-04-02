import { getServerSession } from 'next-auth';

import EntryList from '@/components/Entry/EntryList';
import { authOptions } from '@/lib/auth';
import { Box } from '@mui/joy';

export default async function EntryPage() {
	const session = await getServerSession(authOptions);
	return (
		session?.user && (
			<Box p={1}>
				<EntryList userId={session.user.id} />
			</Box>
		)
	);
}
