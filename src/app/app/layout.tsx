import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { Dashboard, Header, SideBar } from '@/components/Layout';
import EntryList from '@/components/Entry/EntryList';

export default async function Layout({ children }: { children: ReactNode }) {
	const session = await getServerSession(authOptions);
	const user = session?.user;

	return (
		<Dashboard>
			<Header userName={user?.name || ''} userPic={user?.image || ''} />
			<SideBar>{user && <EntryList userId={user.id} />}</SideBar>
			{children}
		</Dashboard>
	);
}
