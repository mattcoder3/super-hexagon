import { updateLocalScore } from './utils.js';
import { addDataValue } from './api/sheets.js';

export default class Player {
	constructor(p, angle) {
		this.p = p;
		this.angle = angle;
		this.radius = 30;
		this.rePos();
	}

	rePos() {
		this.x = this.radius * Math.cos(this.angle);
		this.y = this.radius * Math.sin(this.angle) * -1;
	}

	rotate(sign) {
		this.angle =
			(this.angle + 0.05 * this.p.difficulty * sign + 2 * Math.PI) %
			(2 * Math.PI);
		this.rePos();
	}

	calcDeath(leftAngle) {
		let rightAngle =
			(leftAngle + (5 * (2 * Math.PI)) / 6) % (2 * Math.PI);
		if (leftAngle < rightAngle) {
			this.p.gameOver =
				this.angle > leftAngle && this.angle < rightAngle;
		} else {
			this.p.gameOver =
				this.angle > leftAngle || this.angle < rightAngle;
		}
		if (!this.p.gameOver) {
			this.p.addPointSound.currentTime = 0;
			this.p.addPointSound.volume = this.p.gameVolume;
			this.p.addPointSound.play();
			this.p.score++;
			this.p.scoreHTML.textContent = this.p.score;
			if (this.p.score % 5 == 0 && this.p.score > 0) {
				this.p.setColors();
				this.p.difficulty = Math.min(this.p.difficulty * 1.1, 4);
				this.p.hexagonSpawn.resetInterval();
			}
		} else {
			this.p.loseSound.play();
			this.p.loseSound.volume = this.p.gameVolume;
			this.p.music.pause();
			updateLocalScore(this.p);
			addDataValue(this.p.playerUsername, this.p.score);
		}
	}

	draw() {
		this.p.fill(this.p.mainColor);
		this.p.circle(
			this.p.center[0] + this.x,
			this.p.center[1] + this.y,
			10
		);
	}
}
