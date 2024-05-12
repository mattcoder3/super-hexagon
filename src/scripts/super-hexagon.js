import { COLORS } from './constants.js';
import Player from './player.js';
import Hexagon from './hexagon.js';
import HexagonSpawn from './hexagonSpawn.js';
import { getLocalRecord } from './utils.js';
import { generateUserName } from './utils.js';

const canvas = document.getElementById('canvas');
const height = Math.min(400, innerHeight * 0.6);
const width = Math.min(600, innerWidth * 0.8);

export const game = (p) => {
	p.playerUsername = generateUserName();
	p.scoreHTML = document.getElementById('scoreText');
	p.height = height;
	p.width = width;
	p.center = [p.width / 2, p.height / 2];
	p.music = new Audio('assets/audio/game_music.m4a');
	p.addPointSound = new Audio('assets/audio/add_point.m4a');
	p.loseSound = new Audio('assets/audio/lose.m4a');
	p.difficulty = 2;
	p.gameVolume = 0.3;
	p.score = 0;
	p.maxScore = getLocalRecord();
	p.firstGame = true;
	p.gameOver = true;

	p.preload = () => {
		p.font = p.loadFont('assets/fonts/Jersey10.ttf');
	};

	p.restartGame = () => {
		p.player = new Player(p, 0);
		p.difficulty = 2;
		p.score = 0;
		p.scoreHTML.textContent = p.score;
		p.hexagonSpawn = new HexagonSpawn(p);
		p.setColors();
	};

	p.setColors = () => {
		let color_index = Math.floor(p.score / 5) % 6;
		p.mainColor = COLORS[color_index].main;
		p.bgColor = COLORS[color_index].background;
		p.background(p.mainColor);
	};

	p.setup = () => {
		p.createCanvas(width, height, canvas);
		p.restartGame();
		p.music.volume = p.gameVolume;
		p.music.loop = true;
	};

	p.draw = () => {
		if (!p.gameOver) {
			p.background(p.bgColor + '07');
			p.fill(p.mainColor);
			p.noStroke();

			p.beginShape();
			for (let i = 0; i < 7; i++) {
				let newAngle = ((2 * Math.PI) / 6) * i;
				let x = 20 * Math.cos(newAngle);
				let y = 20 * Math.sin(newAngle) * -1;
				p.vertex(p.center[0] + x, p.center[1] + y);
			}
			p.endShape();

			p.player.draw();
			if (p.keyIsDown(p.DOWN_ARROW)) {
				p.player.rotate(-1);
			}
			if (p.keyIsDown(p.UP_ARROW)) {
				p.player.rotate(1);
			}

			p.hexagonSpawn.draw();
		} else {
			// Key 32 is Spacebar
			if (p.keyIsDown(32)) {
				p.firstGame = false;
				p.gameOver = false;
				p.background(p.mainColor);
				p.restartGame();
				p.music.currentTime = 0;
				p.music.play();
			}

			p.background(p.bgColor + '20');
			let fillOpacity = p.frameCount % 50 < 10 ? '00' : '88';
			p.fill('#FFFFFF' + fillOpacity);
			p.noStroke();
			p.textFont(p.font);
			p.textAlign(p.CENTER);
			p.textSize(p.width / 24);
			let scoreText = p.firstGame ? '' : 'SCORE: ' + p.score;
			p.text(scoreText, p.center[0], p.center[1] - 50);
			p.text(
				'MAX SCORE: ' + p.maxScore,
				p.center[0],
				p.center[1] - 10
			);
			let screenText = p.firstGame
				? 'PRESS "SPACE" TO START'
				: 'PRESS "SPACE" TO RESTART';
			p.textSize(p.width / 12);
			p.text(screenText, p.center[0], p.center[1] + 75);
		}
	};
};
