function updateLocalScore() {
	const record = getLocalRecord();
	maxScore = Math.max(record, score);
	localStorage.setItem('maxScore', maxScore);
}

function getLocalRecord() {
	const record = localStorage.getItem('maxScore');
	return record ? record : 0;
}
