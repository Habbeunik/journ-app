'use client';

import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import CircularProgress from '@mui/joy/CircularProgress';
import IconButton from '@mui/joy/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import SpeechRecognitionController from '@/components/SpeechRecognitionController';
import useSpeechRecogniiton from '@/hooks/useSpeechRecognition';

interface IEditorControlsProps {
	isSaving?: boolean;
	lastUpdatedDate?: string;
	onDelete?: () => void;
	onSpeechIput: (text: string) => void;
}
const EditorControls = (props: IEditorControlsProps) => {
	const { isSaving, lastUpdatedDate, onDelete, onSpeechIput } = props;

	const recognition = useSpeechRecogniiton({
		onInput: onSpeechIput,
	});

	return (
		<Stack
			direction={'row'}
			spacing={3}
			justifyContent={'center'}
			alignItems={'center'}
			position={'relative'}
			p="10px">
			{lastUpdatedDate && (
				<Typography level={'body-sm'} textAlign={'center'}>
					Last Edited: {lastUpdatedDate}
				</Typography>
			)}

			<Stack direction={'row'}>
				<IconButton size="sm" variant="plain">
					<PlayArrowIcon fontSize="small" />
				</IconButton>

				<SpeechRecognitionController
					isActive={recognition.isUsingSpeech}
					isListening={recognition.isListenting}
					onStart={recognition.start}
					onStop={recognition.stop}
				/>

				<IconButton variant="plain" onClick={onDelete}>
					<DeleteOutlineIcon fontSize="small" />
				</IconButton>
			</Stack>
			{isSaving && savingIndicator}
		</Stack>
	);
};

export default EditorControls;

const savingIndicator = (
	<Stack
		direction="row"
		spacing={1}
		position="absolute"
		top={10}
		right={0}
		border={'1px solid #ccc'}
		p={'4px 10px'}
		borderRadius={'15px'}>
		<CircularProgress size="sm" variant="solid" />
		<Typography level="body-sm">Saving</Typography>
	</Stack>
);
