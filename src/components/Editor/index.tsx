'use client';

import { useEffect, useRef, useState } from 'react';
import {
	Typography,
	Box,
	Stack,
	CircularProgress,
	Divider,
	IconButton,
} from '@mui/joy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MicNoneIcon from '@mui/icons-material/MicNone';
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
			if (timerIdRef.current) {
				clearTimeout(timerIdRef.current);
			}
		};
	}, [entry]);

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

						<IconButton size="sm" variant="plain">
							<MicNoneIcon fontSize="small" />
						</IconButton>

						<IconButton variant="plain" onClick={onDelete}>
							<DeleteOutlineIcon fontSize="small" />
						</IconButton>
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
					value={entry}
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
