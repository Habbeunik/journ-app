import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { Dashboard, Header, SideBar } from '@/components/Layout';
import EntryNav, { EntryGroupNav } from '@/components/EntryNav';

export default async function Layout({ children }: { children: ReactNode }) {
	const session = await getServerSession(authOptions);
	const user = session?.user;

	return (
		<Dashboard>
			<Header userName={user?.name || ''} userPic={user?.image || ''} />
			<SideBar>
				<EntryNav
					isActive
					title="Today's Entry"
					subtitle="This is my new entry I don't have stuff to say but I know that I have ..."
					day="Today"
					time="20:00"
				/>
				<EntryGroupNav title="Last Week" />
				<EntryGroupNav title="January 2023" />
				<EntryGroupNav title="December 2024" />
			</SideBar>
			{children}
		</Dashboard>
	);
}
