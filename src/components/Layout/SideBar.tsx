import { ReactNode } from 'react';
import Box from '@mui/joy/Box';

function SideNav({ children }: { children: ReactNode }) {
	return (
		<Box
			component="nav"
			className="Navigation"
			sx={{
				p: 2,
				// bgcolor: 'background.surface',
				borderRight: '1px solid',
				borderColor: 'divider',
				display: {
					xs: 'none',
					sm: 'initial',
				},
			}}>
			{children}
		</Box>
	);
}

export default SideNav;
