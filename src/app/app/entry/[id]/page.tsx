'use client';

import Editor from '@/components/Editor';
import { fetchEntry, postEntry } from '@/lib/api';
import { Entry } from '@/types';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getLastEditedDateString } from '@/lib/date';

interface IEntryPageProps {
	params: {
		id: string;
	};
}
export default function EntryPage(props: IEntryPageProps) {
	const [entry, setEntry] = useState<Entry | null>(null);
	const { data: session } = useSession();

	async function handleSave(entryText: string) {
		if (session?.user?.id) {
			const updateRes = await postEntry({
				userId: session?.user?.id,
				entryText,
				entryId: entry?.id,
			});

			setEntry(updateRes.entry);
		}
	}

	useEffect(() => {
		async function handleFetchEntry() {
			const res = await fetchEntry(props.params.id);
			setEntry(res.entry);
		}

		handleFetchEntry();
	}, [props.params.id]);

	return (
		entry && (
			<Editor
				defaultEntry={entry.text}
				onSave={handleSave}
				lastUpdatedDate={getLastEditedDateString(entry?.updatedAt)}
			/>
		)
	);
}
