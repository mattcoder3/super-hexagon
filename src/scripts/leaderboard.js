import { getData } from './api/sheets.js';

const scoreData = await getData();
const scoreValues = scoreData.values.slice(1);
const sortedValues = scoreValues.sort((a, b) => {
	return Number(a[2]) < Number(b[2]) ? 1 : -1;
});

function lastTimeTop(time) {
	let lastTimeRuns = [];
	if (time == 0) {
		lastTimeRuns = sortedValues.slice(0, 10);
	} else {
		lastTimeRuns = sortedValues.filter((v) => {
			const date = Date.parse(v[0]);
			const now = new Date();
			return (now - date) / (1000 * 60 * 60) < time;
		});
	}
	while (lastTimeRuns.length < 10) {
		lastTimeRuns.push(['', '-', '-']);
	}
	return lastTimeRuns.slice(0, 10);
}

function setLeaderboard(htmlElement, list) {
	htmlElement.innerHTML = '';
	list.forEach((e) => {
		htmlElement.innerHTML += `
      <li class="leaderboard_item">
				<p class="leaderboard_item-text">${e[1]}</p>
				<p class="leaderboard_item-score">${e[2]}</p>
			</li>
    `;
	});
}

function setHTMLLeaderboards() {
	const todayLeaderboardHTML = document.getElementById(
		'leaderboard-list-last-day'
	);
	const lastWeekLeaderboardHTML = document.getElementById(
		'leaderboard-list-last-week'
	);
	const lastMonthLeaderboardHTML = document.getElementById(
		'leaderboard-list-last-month'
	);
	const allTimeLeaderboardHTML = document.getElementById(
		'leaderboard-list-all-time'
	);

	const lastMonthTop = lastTimeTop(24 * 30);
	const lastWeekTop = lastTimeTop(24 * 7);
	const lastDayTop = lastTimeTop(24);
	const AllTimeTop = lastTimeTop(0);

	setLeaderboard(lastMonthLeaderboardHTML, lastMonthTop);
	setLeaderboard(lastWeekLeaderboardHTML, lastWeekTop);
	setLeaderboard(todayLeaderboardHTML, lastDayTop);
	setLeaderboard(allTimeLeaderboardHTML, AllTimeTop);
}

setHTMLLeaderboards();
