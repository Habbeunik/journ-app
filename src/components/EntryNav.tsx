import { Typography, Box, Stack, Divider } from '@mui/joy';
import EditNoteIcon from '@mui/icons-material/EditNote';

export function EntryGroupNav({ title }: { title: string }) {
	return (
		<Box mt={'25px'}>
			<Typography level={'title-sm'} mb={'5px'} sx={{ opacity: 0.7 }}>
				{title}
			</Typography>

			<Stack direction={'column'} spacing={1}>
				<EntryNav
					title="20-04-2022"
					subtitle="This is my new entry I don't have stuff to say but I know that I have..."
					day="Last Week"
					time="19:50"
				/>
				<EntryNav
					title="19-04-2022"
					subtitle="This is my new entry I don't have stuff to say but I know that I have..."
					day="Last Week"
					time="20:37"
				/>
			</Stack>
		</Box>
	);
}

interface IEntryNavProps {
	title: string;
	subtitle: string;
	day: string;
	time: string;
	isActive?: boolean;
}
function EntryNav(props: IEntryNavProps) {
	const { title, subtitle, day, time, isActive } = props;

	return (
		<Box
			bgcolor={isActive ? '#ece9e9' : 'none'}
			borderRadius={'5px'}
			px={'15px'}
			py={'10px'}>
			<Typography level={'title-sm'} mb={'5px'}>
				{title}
			</Typography>
			<Typography level={'body-sm'} lineHeight={1.3}>
				{subtitle}
			</Typography>
			<Stack direction={'row'} spacing={1} mt="5px">
				<EditNoteIcon fontSize={'small'} />
				<Typography level={'body-xs'}>
					{day} {time}
				</Typography>
			</Stack>
			{!isActive && <Divider sx={{ mt: '10px' }} />}
		</Box>
	);
}

export default EntryNav;
