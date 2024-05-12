import { getData } from './api/sheets.js';

const ctx = document.getElementById('chart');

const data = await getData();
const scoreList = data.values.slice(1);
const scoreValues = scoreList.map((v) => Number(v[2]));
const maxValue = Math.max(...scoreValues);
const labels = [...Array(maxValue + 1).keys()];

function countRepetitions(arr) {
	const maxNum = Math.max(...arr);
	const countArr = new Array(maxNum + 1).fill(0);

	arr.forEach((num) => {
		countArr[num]++;
	});

	return countArr;
}

const chartData = countRepetitions(scoreValues);
console.log(scoreValues);

new Chart(ctx, {
	type: 'bar',
	data: {
		labels: labels,
		datasets: [
			{
				label: '# of runs that scored',
				data: chartData,
				borderWidth: 1,
			},
		],
	},
	options: {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	},
});
