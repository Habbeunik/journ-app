import React from 'react';
import moment from 'moment';

import {
	EntryGroupContainer,
	EntryGroupNav,
	TodaysEntryNav,
} from '@/components/Entry/EntryNav';
import UserRepository from '@/repository/user';
import { Entry } from '@/types';

interface IEntryListProps {
	userId: string;
}
export default async function EntryList(props: IEntryListProps) {
	const todayEntry = await UserRepository.findUserTodayEntry(props.userId);
	const entries = (await UserRepository.findOtherEntries(props.userId)) || [];

	type EntryToMonthMap = { [key: string]: Entry[] };
	const entryToMonthMap: EntryToMonthMap = entries.reduce((acc, entry) => {
		const month = moment(entry.updatedAt).format('MMMM');
		acc[month] = acc[month] ? [...acc[month], entry] : [entry];
		return acc;
	}, {} as EntryToMonthMap);

	return (
		<React.Fragment>
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
		</React.Fragment>
	);
}
