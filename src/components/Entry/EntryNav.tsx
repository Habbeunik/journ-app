'use client';

import { useColorScheme } from '@mui/joy/styles';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
	accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
	accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import { Typography, Box, Stack, Divider } from '@mui/joy';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Entry } from '@/types';
import { getEntryNavTimeString, getEntryNavTitle } from '@/lib/date';

interface IEntryGroupNavProps {
	title: string;
	entries?: Entry[];
	defaultExpanded?: boolean;
}
export const EntryGroupContainer = (props: any) => (
	<AccordionGroup
		transition={{
			initial: '0.3s ease-out',
			expanded: '0.2s ease',
		}}
		{...props}
		disableDivider
		sx={{
			[`& .${accordionDetailsClasses.content}`]: {
				padding: '0px',
			},
			[`& .${accordionSummaryClasses.button}`]: {
				padding: '0px',
			},
			[`& .${accordionSummaryClasses.button}:hover`]: {
				background: 'transparent',
			},
		}}
	/>
);
export function EntryGroupNav(props: IEntryGroupNavProps) {
	const { title, entries = [], defaultExpanded } = props;

	const pathname = usePathname();

	return (
		<Box mt={'25px'}>
			<Accordion defaultExpanded={defaultExpanded}>
				<AccordionSummary>
					<Typography level={'title-sm'} mb={'5px'} sx={{ opacity: 0.7 }}>
						{title}
					</Typography>
				</AccordionSummary>

				<AccordionDetails>
					<Stack direction={'column'}>
						{entries.map((entry, index) => (
							<EntryNav
								key={entry.id}
								isActive={pathname === `/app/entry/${entry.id}`}
								hideBottomDivider={index === entries.length - 1}
								title={getEntryNavTitle(entry.createdAt)}
								time={getEntryNavTimeString(entry.updatedAt)}
								subtitle={entry.text}
								href={`/app/entry/${entry.id}`}
							/>
						))}
					</Stack>
				</AccordionDetails>
			</Accordion>
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
	hideBottomDivider?: boolean;
}
function EntryNav(props: IEntryNavProps) {
	const { title, subtitle, time, isActive, href, hideBottomDivider } = props;
	const { mode } = useColorScheme();
	const activeHoverBg = mode === 'dark' ? '#ffffff14' : '#0000000f';

	return (
		<Link href={href}>
			<Box
				bgcolor={isActive ? activeHoverBg : 'transparent'}
				borderRadius={'5px'}
				p={'10px'}
				pb={'0px'}
				sx={{ transition: 'all 0.3s ease' }}>
				<Typography level={'title-sm'} mb={'5px'}>
					{title}
				</Typography>
				<Typography level={'body-sm'} lineHeight={1.3}>
					{subtitle.slice(0, MAX_CHARACTERS_IN_SUBTITLE)}{' '}
					{subtitle.length < MAX_CHARACTERS_IN_SUBTITLE ? '' : '...'}
				</Typography>
				<Stack direction={'row'} spacing={1} mt="5px" mb={'10px'}>
					<EditNoteIcon fontSize={'small'} />
					{time && <Typography level={'body-xs'}>At {time}</Typography>}
				</Stack>
				<Divider
					sx={{ opacity: isActive || hideBottomDivider ? 0 : 1 }}
					color="#ece9e9"
				/>
			</Box>
		</Link>
	);
}

export default EntryNav;

interface TodaysEntryNavProps
	extends Omit<
		IEntryNavProps,
		'isActive' | 'href' | 'title' | 'hideBottomDivider'
	> {}
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
