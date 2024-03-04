export async function fetchTodayEntry(userId: string) {
	const res = await fetch(`/api/user/${userId}/entry/today`, {
		method: 'GET',
	});

	return res.json();
}

export async function fetchEntry(entryId: string) {
	const res = await fetch(`/api/entry/${entryId}`, {
		method: 'GET',
	});

	return res.json();
}

export async function postEntry(payload: {
	userId: string;
	entryText: string;
	entryId?: string;
}) {
	const res = await fetch('/api/entry/save', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	return res.json();
}
