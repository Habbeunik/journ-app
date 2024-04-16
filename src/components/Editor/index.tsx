'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/joy/Box';

import { useDebouncedEffect } from '@/hooks/useDebounce';
import InputArea from './InputArea';
import EditorControls from './Controls';

interface IEditorProps {
	dateCreated?: string;
	defaultEntry?: string;
	onSave?: (entry: string) => void | Promise<void>;
	onDelete?: () => void;
}
function Editor(props: IEditorProps) {
	const { onSave, onDelete, defaultEntry = '', dateCreated } = props;

	const [entry, setEntry] = useState<string>('');
	const [isSaving, setIsSaving] = useState<boolean>(false);

	const inputRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		inputRef.current && inputRef.current?.focus();
	}, []);

	useEffect(() => {
		setEntry(defaultEntry);
	}, [defaultEntry]);

	useDebouncedEffect(async () => {
		if (onSave && entry !== defaultEntry) {
			setIsSaving(true);
			await onSave(entry);
			setIsSaving(false);
		}
	}, [entry, defaultEntry]);

	const [recognizedTexts, setRecognizedTexts] = useState<string>('');

	useEffect(() => {
		if (recognizedTexts) {
			setEntry((prev) => prev + recognizedTexts);
			setRecognizedTexts('');
			inputRef.current?.focus();
		}
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
					minHeight: '100%',
					position: 'relative',
				}}>
				<EditorControls
					isSaving={isSaving}
					dateCreated={dateCreated}
					onSpeechIput={(transcript) => {
						if (transcript.trim()) {
							setRecognizedTexts((prev) => prev + transcript);
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
