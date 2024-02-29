'use client';

import { Typography, Box, Stack, IconButton, Avatar } from '@mui/joy';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';

interface IHeaderProps {
	userName?: string;
	userPic?: string;
}
function Header({ userName, userPic }: IHeaderProps) {
	return (
		<Box
			component="header"
			sx={{
				p: 2,
				gap: 2,
				bgcolor: 'background.surface',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				gridColumn: '1 / -1',
				borderBottom: '1px solid',
				borderColor: 'divider',
				position: 'sticky',
				top: 0,
				zIndex: 1100,
			}}>
			<Box
				sx={{
					display: 'flex',
					flexGrow: 1,
					justifyContent: 'space-between',
				}}>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={1}
					sx={{ display: { xs: 'none', sm: 'flex' } }}>
					<IconButton
						size="md"
						variant="outlined"
						color="neutral"
						sx={{
							display: { xs: 'none', sm: 'inline-flex' },
							borderRadius: '50%',
						}}>
						<NotesRoundedIcon />
					</IconButton>
					<Typography level="h4">Journ App.</Typography>
				</Stack>
				<Stack direction="row" alignItems="center" spacing={2}>
					<Stack direction="row" alignItems="center" spacing={1}>
						<Typography level="body-md">{userName}</Typography>
						<Avatar
							src={userPic}
							srcSet={userPic}
							sx={{ maxWidth: '32px', maxHeight: '32px' }}
						/>
					</Stack>
					<IconButton
						aria-label="logout"
						onClick={() => {
							signOut();
						}}>
						<LogoutIcon />
					</IconButton>
				</Stack>
			</Box>
		</Box>
	);
}

export default Header;
