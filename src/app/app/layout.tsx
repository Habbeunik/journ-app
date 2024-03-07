import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import moment from 'moment';

import { authOptions } from '@/lib/auth';
import { Dashboard, Header, SideBar } from '@/components/Layout';
import {
	EntryGroupContainer,
	EntryGroupNav,
	TodaysEntryNav,
} from '@/components/Entry/EntryNav';
import UserRepository from '@/repository/user';
import { Entry } from '@/types';

export default async function Layout({ children }: { children: ReactNode }) {
	const session = await getServerSession(authOptions);
	const user = session?.user;

	const todayEntry = user
		? await UserRepository.findUserTodayEntry(user?.id)
		: null;
	const entries = user ? await UserRepository.findOtherEntries(user?.id) : [];

	type EntryToMonthMap = { [key: string]: Entry[] };
	const entryToMonthMap: EntryToMonthMap = entries.reduce((acc, entry) => {
		const month = moment(entry.updatedAt).format('MMMM');
		acc[month] = acc[month] ? [...acc[month], entry] : [entry];
		return acc;
	}, {} as EntryToMonthMap);

	return (
		<Dashboard>
			<Header userName={user?.name || ''} userPic={user?.image || ''} />
			<SideBar>
				<TodaysEntryNav
					subtitle={todayEntry?.text ?? '...'}
					time={todayEntry?.createdAt?.toLocaleTimeString() ?? ''}
				/>
				<EntryGroupContainer>
					{Object.entries(entryToMonthMap).map(([month, entries], index) => (
						<EntryGroupNav
							defaultExpanded={index === 0}
							key={month}
							title={month}
							entries={entries}
						/>
					))}
				</EntryGroupContainer>
			</SideBar>
			{children}
		</Dashboard>
	);
}
