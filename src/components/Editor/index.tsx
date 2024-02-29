'use client';

import { useState } from 'react';
import { Typography, Box, Stack, Divider } from '@mui/joy';

function Editor() {
	const [entry, setEntry] = useState<string>(
		"This is my new entry I don't have stuff to say but I know that I have to type something that would make some sense. What is sense. /n Today is 25th of the year and I don't even know what the fuck is going on "
	);

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
					p: '15px',
					// maxWidth: '800px',
					margin: 'auto',
					minHeight: '60vh',
				}}>
				<Stack direction={'column'} mb={'15px'}>
					<Typography level={'body-sm'} textAlign={'center'}>
						28th February 2024 at 16:47
					</Typography>
					{/* <Typography level="body-sm">Saving ...</Typography> */}
				</Stack>
				<textarea
					value={entry}
					onChange={(e) => {
						setEntry(e.target.value);
					}}
					style={{
						width: '100%',
						flex: 1,
						border: 'none',
						fontSize: '20px',
						padding: '20px 0px',
						outline: 'none',
						fontFamily: 'var(--joy-fontFamily-display)',
						lineHeight: '30px',
						background: 'none',
						color: 'black',
					}}
				/>
			</Box>
		</Box>
	);
}

export default Editor;
