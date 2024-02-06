import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const passwordUtils = {
	async hash(txt: string) {
		return bcrypt.hash(txt, SALT_ROUNDS);
	},
	async isSame(txt: string, hashTxt: string) {
		return bcrypt.compare(txt, hashTxt);
	},
};

export default passwordUtils;

// function quickSort(arr) {

// 	const pivotIndex = Math.round(arr.length / 2);
// 	const pivot = arr[pivotIndex];
// 	const less = [];
// 	const great = [];

// 	for (var i = 0; i < arr.length; i++) {
// 		let selectedItem = arr[i];

// 		if (i !== pivotIndex) {
// 			if (selectedItem < pivot) {
// 				less.push(selectedItem);
// 			} else {
// 				great.push(selectedItem);
// 			}
// 		}
// 	}

// 	return [...quickSort(less), pivot, ...quickSort(great)];
// }
