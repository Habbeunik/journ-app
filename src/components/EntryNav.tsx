'use client';

import { Typography, Box, Stack, Divider } from '@mui/joy';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Entry } from '@/types';
import moment from 'moment';
import { getEntryNavTimeString, getEntryNavTitle } from '@/lib/date';

interface IEntryGroupNavProps {
	title: string;
	entries?: Entry[];
}
export function EntryGroupNav(props: IEntryGroupNavProps) {
	const { title, entries = [] } = props;

	const pathname = usePathname();

	return (
		<Box mt={'25px'}>
			<Typography level={'title-sm'} mb={'5px'} sx={{ opacity: 0.7 }}>
				{title}
			</Typography>

			<Stack direction={'column'} spacing={1}>
				{entries.map((entry) => (
					<EntryNav
						key={entry.id}
						isActive={pathname === `/app/entry/${entry.id}`}
						title={getEntryNavTitle(entry.createdAt)}
						time={getEntryNavTimeString(entry.updatedAt)}
						subtitle={entry.text}
						href={`/app/entry/${entry.id}`}
					/>
				))}
			</Stack>
		</Box>
	);
}

const MAX_CHARACTERS_IN_SUBTITLE = 65;
interface IEntryNavProps {
	title: string;
	subtitle: string;
	time: string;
	isActive?: boolean;
	href: string;
}
function EntryNav(props: IEntryNavProps) {
	const { title, subtitle, time, isActive, href } = props;
	return (
		<Link href={href}>
			<Box
				bgcolor={isActive ? '#ece9e9' : 'none'}
				borderRadius={'5px'}
				px={'15px'}
				py={'10px'}>
				<Typography level={'title-sm'} mb={'5px'}>
					{title}
				</Typography>
				<Typography level={'body-sm'} lineHeight={1.3}>
					{subtitle.slice(0, MAX_CHARACTERS_IN_SUBTITLE)}{' '}
					{subtitle.length < MAX_CHARACTERS_IN_SUBTITLE ? '' : '...'}
				</Typography>
				<Stack direction={'row'} spacing={1} mt="5px">
					<EditNoteIcon fontSize={'small'} />
					{time && <Typography level={'body-xs'}>At {time}</Typography>}
				</Stack>
				<Divider sx={{ mt: '10px', opacity: isActive ? 0 : 1 }} />
			</Box>
		</Link>
	);
}

export default EntryNav;

interface TodaysEntryNavProps
	extends Omit<IEntryNavProps, 'isActive' | 'href' | 'title'> {}
export function TodaysEntryNav(props: TodaysEntryNavProps) {
	const pathname = usePathname();
	return (
		<EntryNav
			isActive={pathname === '/app'}
			href="/app"
			title="Today's Entry"
			{...props}
		/>
	);
}
