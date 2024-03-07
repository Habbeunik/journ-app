import moment from 'moment';

export const today = () => {
	let d = new Date();
	d.setHours(0, 0, 0, 0);

	return d;
};

type CustomDate = Date | string | null;
export function getLastEditedDateString(date?: CustomDate) {
	if (!date) return;

	return `${moment(date).format('dddd Do  MMMM YYYY')} at ${moment(date).format(
		'LT'
	)}`;
}

export function getEntryNavTimeString(date: CustomDate) {
	return `${moment(date).format('LT')}`;
}

export function getEntryNavTitle(date: CustomDate) {
	return `${moment(date).format('dddd Do')}`;
}
