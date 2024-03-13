'use client';

import { use, useEffect, useRef, useState } from 'react';
import {
	Typography,
	Box,
	Stack,
	CircularProgress,
	Divider,
	IconButton,
	LinearProgress,
} from '@mui/joy';
import { iconButtonClasses } from '@mui/joy/IconButton';
import { linearProgressClasses } from '@mui/joy/LinearProgress';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MicOffIcon from '@mui/icons-material/MicOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface IEditorProps {
	lastUpdatedDate?: string;
	defaultEntry?: string;
	onSave?: (entry: string) => void | Promise<void>;
	onDelete?: () => void;
}
function Editor(props: IEditorProps) {
	const { onSave, onDelete, defaultEntry = '', lastUpdatedDate } = props;

	const [entry, setEntry] = useState<string>('');
	const [isSaving, setIsSaving] = useState<boolean>(false);

	const inputRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		inputRef.current && inputRef.current?.focus();
	}, []);

	useEffect(() => {
		setEntry(defaultEntry);
	}, [defaultEntry]);

	//debounce on save
	const timerIdRef = useRef<NodeJS.Timeout>();
	useEffect(() => {
		if (onSave && Boolean(entry)) {
			timerIdRef.current = setTimeout(async () => {
				setIsSaving(true);
				await onSave(entry);
				setIsSaving(false);
			}, 1000);
		}

		return () => {
			clearTimeout(timerIdRef.current);
		};
	}, [entry]);

	const [recognizedTexts, setRecognizedTexts] = useState<string>('');
	const recognition = useSpeechRecogniiton({
		onInput(transcript) {
			setRecognizedTexts((prev) => `${prev} ${transcript}`);
		},
	});

	const entryTimerRef = useRef<NodeJS.Timeout>();
	useEffect(() => {
		if (recognizedTexts) {
			entryTimerRef.current = setTimeout(() => {
				setEntry((prev) => prev + recognizedTexts);
				setRecognizedTexts('');
			}, 2000);
		}

		return () => {
			clearTimeout(entryTimerRef.current);
		};
	}, [recognizedTexts]);

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
					p: '15px',
					pt: '0px',
					maxWidth: '1200px',
					margin: 'auto',
					minHeight: '60vh',
					position: 'relative',
				}}>
				<Stack
					direction={'row'}
					spacing={3}
					justifyContent={'center'}
					alignItems={'center'}
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

						<SpeechInputControl
							isActive={recognition.isUsingSpeech}
							isListening={recognition.isListenting}
							onStart={recognition.start}
							onStop={recognition.stop}
						/>

						{/* <IconButton
							size="sm"
							variant="plain"
							sx={{ borderRadius: '50%' }}
							onClick={() => {
								recognition.start();
							}}>
							<MicNoneIcon fontSize="small" />
						</IconButton>

						<IconButton variant="plain" onClick={onDelete}>
							<DeleteOutlineIcon fontSize="small" />
						</IconButton> */}
					</Stack>
				</Stack>

				{isSaving && (
					<Stack
						direction="row"
						spacing={1}
						position="absolute"
						top={10}
						right={0}>
						<CircularProgress size="sm" variant="plain" />
						<Typography level="body-sm">Saving</Typography>
					</Stack>
				)}
				<textarea
					ref={inputRef}
					value={entry + recognizedTexts}
					onChange={(e) => {
						setEntry(e.target.value);
					}}
					placeholder="Write something here..."
					style={{
						width: '100%',
						flex: 1,
						border: 'none',
						fontSize: '20px',
						padding: '20px 0px',
						outline: 'none',
						fontFamily: 'var(--joy-fontFamily-display)',
						lineHeight: '30px',
						background: 'none',
						color: 'black',
					}}
				/>
			</Box>
		</Box>
	);
}

export default Editor;

const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.continuous = true;

type SpeechRecognitionHookArg = {
	onInput: (transcript: string) => void;
};
function useSpeechRecogniiton(opts: SpeechRecognitionHookArg) {
	const { onInput } = opts;

	const [isUsingSpeech, setIsUsingSpeech] = useState<boolean>(false);
	const [isListenting, setIsListening] = useState<boolean>(false);

	useEffect(() => {
		recognition.onend = () => {
			setIsUsingSpeech(false);
		};
		recognition.onresult = ({ results, resultIndex }) => {
			onInput(results[resultIndex][0].transcript);
		};
		recognition.onsoundstart = () => {
			setIsListening(true);
		};
		recognition.onsoundend = () => {
			setIsListening(false);
		};
	}, [onInput]);

	return {
		isUsingSpeech,
		isListenting,
		start: () => {
			recognition.start();
			setIsUsingSpeech(true);
		},
		stop: () => {
			recognition.stop();
			recognition.abort();
			setIsUsingSpeech(false);
			setIsListening(false);
		},
	};
}

interface ISpeechInputControlProps {
	isListening: boolean;
	isActive: boolean;
	onStart: () => void;
	onStop: () => void;
}
const SpeechInputControl = (props: ISpeechInputControlProps) => {
	const { isListening, isActive, onStart, onStop } = props;

	return (
		<Stack
			slots={{ root: 'button' }}
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			sx={{
				bgcolor: isActive ? (isListening ? 'orange' : 'blue') : 'transparent',
				borderRadius: '30px',
				[`& .${iconButtonClasses.root}:hover`]: {
					bgcolor: 'transparent',
				},
				[`& .${linearProgressClasses.root}`]: { width: '50px' },
				[`& .${linearProgressClasses.root}::before`]: { color: 'blue' },
				pr: isActive ? '15px' : 0,
				width: isActive ? '98px' : '32px',
				transition: 'all 100ms ease-out',
			}}
			onClick={() => {
				isActive ? onStop() : onStart();
			}}>
			<IconButton size="sm">
				{isActive ? <MicOffIcon sx={{ color: 'white' }} /> : <MicNoneIcon />}
			</IconButton>
			{isActive && (
				<>
					{isListening ? (
						<Typography
							level="body-xs"
							sx={{ color: 'white', cursor: 'pointer' }}
							width={'50px'}>
							listening...
						</Typography>
					) : (
						<Box width={'50px'}>
							<LinearProgress thickness={1} size="sm" sx={{ width: '50px' }} />
						</Box>
					)}
				</>
			)}
		</Stack>
	);
};
