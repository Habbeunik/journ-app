import { ReactNode } from 'react';
import Box from '@mui/joy/Box';

function Dashboard({ children }: { children: ReactNode }) {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: {
					xs: '1fr',
					sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
					md: 'minmax(160px, 350px) minmax(300px, 1fr)',
				},
				gridTemplateRows: '64px 1fr',
				minHeight: '100vh',
			}}>
			{children}
		</Box>
	);
}

export default Dashboard;
