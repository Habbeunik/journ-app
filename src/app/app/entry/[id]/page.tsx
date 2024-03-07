'use client';

import Editor from '@/components/Editor';
import * as api from '@/lib/api';
import { Entry } from '@/types';
import { Fragment, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button, CircularProgress, Snackbar, Stack } from '@mui/joy';
import { useRouter } from 'next/navigation';

import { EntryDeleteModal } from '@/components/Entry';
import { getLastEditedDateString } from '@/lib/date';

interface IEntryPageProps {
	params: {
		id: string;
	};
}
export default function EntryPage(props: IEntryPageProps) {
	const [isFetching, setIsFetching] = useState<boolean>(true);
	const [entry, setEntry] = useState<Entry | null>(null);

	const router = useRouter();
	const { data: session } = useSession();

	async function handleSave(entryText: string) {
		if (session?.user?.id) {
			const updateRes = await api.postEntry({
				userId: session?.user?.id,
				entryText,
				entryId: entry?.id,
			});

			setEntry(updateRes.entry);
		}
	}

	useEffect(() => {
		async function handleFetchEntry() {
			setIsFetching(true);
			const res = await api.fetchEntry(props.params.id);
			setEntry(res.entry);
			setIsFetching(false);
		}

		handleFetchEntry();
	}, [props.params.id]);

	const [{ open: deleteModalIsOpen, isDeleting }, setModalState] = useState({
		open: false,
		isDeleting: false,
	});
	const [deleteStatus, setDeleteStatus] = useState<'error' | 'success' | null>(
		null
	);

	async function deleteEntry() {
		try {
			setModalState({ open: true, isDeleting: true });
			await api.deleteEntry(props.params.id);

			setDeleteStatus('success');
			router.replace('/app');
		} catch (e) {
			setDeleteStatus('error');
			setModalState({ open: true, isDeleting: false });
		}
	}

	return (
		<Fragment>
			{entry && !isFetching ? (
				<Editor
					defaultEntry={entry.text}
					onSave={handleSave}
					lastUpdatedDate={getLastEditedDateString(entry?.updatedAt)}
					onDelete={() => {
						setModalState({ open: true, isDeleting: false });
					}}
				/>
			) : (
				<Stack width="100%" py={10} direction="row" justifyContent={'center'}>
					<CircularProgress size="sm" />
				</Stack>
			)}
			<EntryDeleteModal
				open={deleteModalIsOpen}
				isProcessing={isDeleting}
				onClose={() => {
					setModalState({ open: false, isDeleting: false });
				}}
				onConfirm={() => {
					deleteEntry();
				}}
			/>
			<Snackbar
				open={Boolean(deleteStatus)}
				variant="soft"
				color={deleteStatus === 'error' ? 'danger' : 'success'}
				autoHideDuration={10000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				onClose={() => setDeleteStatus(null)}
				endDecorator={
					<Button
						onClick={() => () => setDeleteStatus(null)}
						size="sm"
						variant="soft"
						color={deleteStatus === 'error' ? 'danger' : 'success'}>
						Dismiss
					</Button>
				}>
				{deleteStatus === 'error' ? 'Failed to delete entry' : 'Entry deleted'}
			</Snackbar>
		</Fragment>
	);
}
