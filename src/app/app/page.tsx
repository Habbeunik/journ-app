'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Editor from '@/components/Editor';
import * as api from '@/lib/api';
import { Entry } from '@/types';
import { getLastEditedDateString } from '@/lib/date';

export default function App() {
	const [todayEntry, setTodayEntry] = useState<Entry | null>(null);

	const { data: session } = useSession();

	async function handleSave(entryText: string) {
		if (session?.user?.id) {
			const updateRes = await api.postEntry({
				userId: session?.user?.id,
				entryText: entryText,
				entryId: todayEntry?.id,
			});

			setTodayEntry(updateRes.entry);
		}
	}

	useEffect(() => {
		async function handleFetchTodayEntry() {
			const res = session?.user?.id
				? await api.fetchTodayEntry(session?.user?.id)
				: null;

			setTodayEntry(res.entry);
		}

		handleFetchTodayEntry();
	}, [session]);

	return (
		<Editor
			onSave={handleSave}
			defaultEntry={todayEntry?.text}
			lastUpdatedDate={getLastEditedDateString(todayEntry?.updatedAt)}
		/>
	);
}
