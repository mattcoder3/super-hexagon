const canvas = document.getElementById('canvas'),
	scoreHTML = document.getElementById('scoreText'),
	height = Math.min(400, innerHeight * 0.6),
	width = Math.min(600, innerWidth * 0.8),
	center = [width / 2, height / 2],
	music = new Audio('assets/audio/game_music.m4a'),
	addPointSound = new Audio('assets/audio/add_point.m4a'),
	loseSound = new Audio('assets/audio/lose.m4a');
let player,
	difficulty = 2,
	gameVolume = 0.3,
	font,
	bgColor,
	mainColor,
	score = 0,
	maxScore = getLocalRecord(),
	hexagonSpawn,
	firstGame = true,
	gameOver = true;

function preload() {
	font = loadFont('assets/Jersey10.ttf');
}

function restartGame() {
	player = new Player(0);
	hexagons = [];
	score = 0;
	scoreHTML.textContent = score;
	hexagonSpawn = new HexagonSpawn(difficulty);
	setColors();
}

function setColors() {
	let color_index = Math.floor(score / 5) % 6;
	mainColor = COLORS[color_index].main;
	bgColor = COLORS[color_index].background;
	background(mainColor);
}

function setup() {
	createCanvas(width, height, canvas);
	restartGame();
	music.volume = gameVolume;
	music.loop = true;
}

function draw() {
	if (!gameOver) {
		background(bgColor + '07');
		fill(mainColor);
		noStroke();

		beginShape();
		for (let i = 0; i < 7; i++) {
			let newAngle = ((2 * Math.PI) / 6) * i;
			let x = 20 * Math.cos(newAngle);
			let y = 20 * Math.sin(newAngle) * -1;
			vertex(center[0] + x, center[1] + y);
		}
		endShape();

		player.draw();
		if (keyIsDown(DOWN_ARROW)) {
			player.rotate(-1);
		}
		if (keyIsDown(UP_ARROW)) {
			player.rotate(1);
		}

		hexagonSpawn.draw();
	} else {
		// Key 32 is Spacebar
		if (keyIsDown(32)) {
			firstGame = false;
			gameOver = false;
			background(mainColor);
			restartGame();
			music.currentTime = 0;
			music.play();
		}

		background(bgColor + '20');
		let fillOpacity = frameCount % 50 < 10 ? '00' : '88';
		fill('#FFFFFF' + fillOpacity);
		noStroke();
		textFont(font);
		textAlign(CENTER);
		textSize(width / 24);
		let scoreText = firstGame ? '' : 'SCORE: ' + score;
		text(scoreText, center[0], center[1] - 50);
		text('MAX SCORE: ' + maxScore, center[0], center[1] - 10);
		let screenText = firstGame
			? 'PRESS "SPACE" TO START'
			: 'PRESS "SPACE" TO RESTART';
		textSize(width / 12);
		text(screenText, center[0], center[1] + 75);
	}
}
