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
	dateCreated?: string;
	onDelete?: () => void;
	onSpeechIput: (text: string) => void;
}
const EditorControls = (props: IEditorControlsProps) => {
	const { isSaving, dateCreated, onDelete, onSpeechIput } = props;

	const recognition = useSpeechRecogniiton({
		onInput: onSpeechIput,
	});

	return (
		<Stack
			direction={{ xs: 'column', sm: 'row' }}
			spacing={{ xs: 1, sm: 3 }}
			justifyContent={'center'}
			alignItems={'center'}
			position={'relative'}
			p="10px">
			{dateCreated && (
				<Typography level={'body-xs'} textAlign={'center'}>
					Created: {dateCreated}
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
