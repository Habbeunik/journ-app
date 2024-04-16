import { useCallback, useEffect, useRef } from 'react';

export const useDebouncedEffect = (
	cb: () => void,
	dep: any[] = [],
	delay = 1000
) => {
	const timerRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		timerRef.current = setTimeout(() => {
			cb();
		}, delay);

		return () => {
			clearTimeout(timerRef.current);
		};
	}, [dep]);
};
