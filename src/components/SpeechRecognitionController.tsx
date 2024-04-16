import { useState } from 'react';
import Stack from '@mui/joy/Stack';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MicOffIcon from '@mui/icons-material/MicOff';

import { useDebouncedEffect } from '@/hooks/useDebounce';

interface ISpeechRecognitionControllerProps {
	isListening: boolean;
	isActive: boolean;
	onStart: () => void;
	onStop: () => void;
}

const SpeechRecognitionController = (
	props: ISpeechRecognitionControllerProps
) => {
	const { isListening, isActive, onStart, onStop } = props;

	const [showText, setShowText] = useState(false);
	useDebouncedEffect(
		() => {
			setShowText(isListening);
		},
		[isListening],
		1000
	);

	const activeColor = isListening ? '#ff7000' : 'blue';

	return (
		<Stack
			slots={{ root: 'button' }}
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			sx={{
				border: '1px solid',
				borderColor: isActive ? activeColor : 'transparent',
				borderRadius: '30px',
				[`& .${iconButtonClasses.root}:hover`]: {
					bgcolor: 'transparent',
				},
				pr: isListening ? '15px' : 0,
				width: isListening ? '110px' : '35px',
				transition: 'all 100ms ease-out',
			}}
			onClick={() => {
				isActive ? onStop() : onStart();
			}}>
			<IconButton size="sm">
				{isActive ? (
					<MicOffIcon sx={{ color: activeColor }} />
				) : (
					<MicNoneIcon />
				)}
			</IconButton>

			{isListening && showText && (
				<Typography
					level="body-xs"
					sx={{ cursor: 'pointer', color: activeColor }}>
					writing _/_
				</Typography>
			)}
		</Stack>
	);
};

export default SpeechRecognitionController;
