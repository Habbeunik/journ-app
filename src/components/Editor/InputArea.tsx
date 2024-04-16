import { LegacyRef, forwardRef } from 'react';
import { useColorScheme } from '@mui/joy/styles';

interface IInputAreaProps {
	value: string;
	onChange: (value: string) => void;
}
const InputArea = forwardRef((props: IInputAreaProps, ref) => {
	const { value, onChange } = props;
	const { mode } = useColorScheme();
	return (
		<textarea
			ref={ref as LegacyRef<HTMLTextAreaElement>}
			value={value}
			onChange={(e) => {
				onChange(e.target.value);
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
				color: mode === 'dark' ? 'white' : 'black',
			}}
		/>
	);
});

InputArea.displayName = 'InputArea';

export default InputArea;
