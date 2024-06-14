import { Typography, Box, Stack, IconButton } from '@mui/joy';
import EditNoteIcon from '@mui/icons-material/EditNote';
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
						<EditNoteIcon />
					</IconButton>
					<Typography level="h1">JournApp</Typography>
				</Stack>
				<Typography>
					Encrypted journaling platforms, only you get to read your journal!.
				</Typography>
			</Box>
			{children}
		</Box>
	);
}

export default AuthLayout;
