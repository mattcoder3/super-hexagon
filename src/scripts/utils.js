export function updateLocalScore(p) {
	const record = getLocalRecord();
	const allScores = getAllScores();
	p.maxScore = Math.max(record, p.score);
	allScores.push(p.score.toString());
	localStorage.setItem('maxScore', p.maxScore);
	localStorage.setItem('allScores', allScores);
	console.log(allScores);
}

export function getLocalRecord() {
	const record = localStorage.getItem('maxScore');
	return record ? record : 0;
}

export function getAllScores() {
	const allScores = localStorage.getItem('allScores');
	return allScores ? allScores.split(',') : [];
}

export function generateUserName() {
	let username = localStorage.getItem('username');
	if (!username) {
		const randInt = Math.floor(Math.random() * 10000);
		username = 'player' + randInt.toString();
	}
	return updateUserName(username);
}

export function updateUserName(newUsername) {
	const usernameHTML = document.getElementById('username');
	const usernameInputHTML = document.getElementById('username-input');
	localStorage.setItem('username', newUsername);
	usernameHTML.innerText = newUsername;
	usernameInputHTML.setAttribute('value', newUsername);
	return newUsername;
}
