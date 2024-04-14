const canvas = document.getElementById('canvas'),
	height = 400,
	width = 600,
	hexAmount = 3;
let player,
	hexagons = [],
	gameOver = false;

function restartGame() {
	player = new Player(0);
	hexagons = [];
	gameOver = false;
	let i = 0;
	let createHexagons = window.setInterval(() => {
		i++;
		hexagons.push(new Hexagon(400));
		if (i >= hexAmount) {
			window.clearInterval(createHexagons);
		}
	}, 1100);
}

function setup() {
	createCanvas(width, height, canvas);
	restartGame();
}

function draw() {
	if (!gameOver) {
		background(88, 16, 16);
		noStroke();
		fill(255);
		circle(width / 2, height / 2, 25);
		player.draw();
		if (keyIsDown(DOWN_ARROW)) {
			player.rotate(-1);
		}
		if (keyIsDown(UP_ARROW)) {
			player.rotate(1);
		}

		hexagons.forEach((hexagon) => hexagon.draw());
	} else {
		if (keyIsDown(32)) {
			restartGame();
		}
	}
}
