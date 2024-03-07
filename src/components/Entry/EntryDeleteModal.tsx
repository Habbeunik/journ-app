import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

interface IEntryDeleteModalProps {
	isProcessing?: boolean;
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
}
function EntryDeleteModal(props: IEntryDeleteModalProps) {
	const { open, onClose, onConfirm, isProcessing } = props;

	return (
		<Modal open={open} onClose={onClose}>
			<ModalDialog variant="outlined" role="alertdialog">
				<DialogTitle>
					<WarningRoundedIcon />
					Delete Entry
				</DialogTitle>
				<Divider />
				<DialogContent>
					Are you sure you want to discard all of your notes?
				</DialogContent>
				<DialogActions>
					<Button
						loading={isProcessing}
						variant="solid"
						color="danger"
						onClick={onConfirm}>
						Delete entry
					</Button>
					<Button variant="plain" color="neutral" onClick={onClose}>
						Cancel
					</Button>
				</DialogActions>
			</ModalDialog>
		</Modal>
	);
}

export default EntryDeleteModal;
