'use client';

import {
	Typography,
	Box,
	Stack,
	IconButton,
	Avatar,
	List,
	ListItem,
	ListItemButton,
	Drawer,
} from '@mui/joy';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import Sheet from '@mui/joy/Sheet';
import Link from 'next/link';

interface IHeaderProps {
	userName?: string;
	userPic?: string;
}
function Header({ userName, userPic }: IHeaderProps) {
	const [openDrawer, setOpenDrawer] = React.useState(false);

	return (
		<React.Fragment>
			<Drawer
				anchor="bottom"
				open={openDrawer}
				variant="plain"
				size="sm"
				onClose={() => {
					setOpenDrawer(false);
				}}
				slotProps={{
					content: {
						sx: {
							bgcolor: 'transparent',
							p: 1,
							boxShadow: 'none',
							height: '150px',
							overflow: 'hidden',
						},
					},
				}}>
				<Sheet
					sx={{
						borderRadius: 'md',
						p: 2,
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						height: '100%',
					}}>
					<List>
						<ListItem key={'entries'}>
							<Link href="/app/entry">
								<ListItemButton>
									<IconButton size="md">
										<EditNoteIcon />
									</IconButton>
									View Entries
								</ListItemButton>
							</Link>
						</ListItem>

						<ListItem key={'logout'}>
							<ListItemButton
								onClick={() => {
									signOut();
								}}>
								<IconButton aria-label="logout">
									<LogoutIcon />
								</IconButton>
								Logout
							</ListItemButton>
						</ListItem>
					</List>
				</Sheet>
			</Drawer>
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
						sx={{ display: 'flex' }}>
						<IconButton
							size="sm"
							variant="outlined"
							color="neutral"
							sx={{
								display: 'inline-flex',
								borderRadius: '50%',
							}}>
							<EditNoteIcon />
						</IconButton>
						<Typography level="h4">JournApp</Typography>
					</Stack>
					<Stack
						sx={{ display: { xs: 'none', md: 'flex' } }}
						direction="row"
						alignItems="center"
						spacing={2}>
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

					<Box sx={{ display: { xs: 'block', md: 'none' } }}>
						<IconButton
							aria-label="menu"
							onClick={() => {
								setOpenDrawer(true);
							}}>
							<MenuIcon />
						</IconButton>
					</Box>
				</Box>
			</Box>
		</React.Fragment>
	);
}

export default Header;
