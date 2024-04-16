'use client';

import { useEffect, useRef, useState } from 'react';

type SpeechRecognitionHookArg = {
	onInput: (transcript: string) => void;
};
const useSpeechRecogniiton = (opts: SpeechRecognitionHookArg) => {
	const { onInput } = opts;

	const recognition = useRef<SpeechRecognition>(
		new webkitSpeechRecognition() || new SpeechRecognition()
	);
	recognition.current.continuous = true;
	recognition.current.interimResults = false;

	const [isUsingSpeech, setIsUsingSpeech] = useState<boolean>(false);
	const [isListenting, setIsListening] = useState<boolean>(false);

	useEffect(() => {
		recognition.current.onend = () => {
			setIsUsingSpeech(false);
		};
		recognition.current.onresult = ({ results, resultIndex }) => {
			onInput(results[resultIndex][0].transcript);
		};
		recognition.current.onsoundstart = () => {
			setIsListening(true);
		};
		recognition.current.onsoundend = () => {
			setIsListening(false);
		};
	}, [onInput]);

	return {
		isUsingSpeech,
		isListenting,
		start() {
			recognition.current.start();
			setIsUsingSpeech(true);
		},
		stop() {
			recognition.current.stop();
			recognition.current.abort();
			setIsUsingSpeech(false);
			setIsListening(false);
		},
	};
};

export default useSpeechRecogniiton;
