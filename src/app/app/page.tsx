import { Typography, Box, Stack, Divider } from '@mui/joy';
import { getServerSession } from 'next-auth/next';
import React, { useEffect } from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getSession } from 'next-auth/react';

function Editor() {
	return (
		<Box sx={{ pt: '50px' }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
					p: '15px',
					maxWidth: '800px',
					margin: 'auto',
					minHeight: '60vh',
				}}>
				<Divider />
				<Stack direction="row" justifyContent="space-between" py="15px">
					<Typography level="h4">Thur 11/07/2024</Typography>
					<Typography level="body-sm">Saving ...</Typography>
				</Stack>
				<Divider />
				<textarea
					style={{
						width: '100%',
						flex: 1,
						border: 'none',
						fontSize: '20px',
						padding: '20px 0px',
						outline: 'none',
						fontFamily: 'var(--joy-fontFamily-display)',
						lineHeight: '30px',
					}}
				/>
			</Box>
		</Box>
	);
}

export default async function App() {
	// useEffect(function () {
	// 	(async function session() {
	// 		const session = await getSession();
	// 		console.log('SEssion on  app', session);
	// 	})();
	// }, []);
	const session = await getServerSession(authOptions);
	console.log('session on server', session);
	return <Editor />;
}
