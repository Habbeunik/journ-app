'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/joy/Box';

import { useDebounceEffect } from '@/hooks/useDebounce';
import InputArea from './InputArea';
import EditorControls from './Controls';

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

	useDebounceEffect(async () => {
		if (onSave && entry !== defaultEntry) {
			setIsSaving(true);
			await onSave(entry);
			setIsSaving(false);
		}
	}, [entry, defaultEntry]);

	const [recognizedTexts, setRecognizedTexts] = useState<string>('');

	useDebounceEffect(
		() => {
			if (recognizedTexts) {
				setEntry((prev) => prev + recognizedTexts);
				setRecognizedTexts('');
				inputRef.current?.focus();
			}
		},
		[recognizedTexts],
		2000
	);

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
				<EditorControls
					isSaving={isSaving}
					lastUpdatedDate={lastUpdatedDate}
					onSpeechIput={(transcript) => {
						if (transcript.trim()) {
							setEntry((prev) => prev + transcript);
						}
					}}
					onDelete={onDelete}
				/>
				<InputArea
					value={entry}
					onChange={(value) => setEntry(value)}
					ref={inputRef}
				/>
			</Box>
		</Box>
	);
}

export default Editor;
