import { Typography, Box, Stack, IconButton } from '@mui/joy';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import { ReactNode } from 'react';

function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<Box width={'100%'} maxWidth={400} textAlign="center">
			<Box marginBottom={'50px'}>
				<Stack direction={'row'} justifyContent={'center'}>
					<IconButton
						size="md"
						variant="outlined"
						color="neutral"
						sx={{
							display: { xs: 'none', sm: 'inline-flex' },
							borderRadius: '50%',
							width: '50px',
							mr: '15px',
						}}>
						<NotesRoundedIcon />
					</IconButton>
					<Typography level="h1">Journ App.</Typography>
				</Stack>
				<Typography>
					Unlike other journaling platforms, you can write as much and as often
					as you like, all for free.
				</Typography>
			</Box>
			{children}
		</Box>
	);
}

export default AuthLayout;
