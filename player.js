class Player {
	constructor(angle) {
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
			(this.angle + 0.1 * sign + 2 * Math.PI) % (2 * Math.PI);
		this.rePos();
	}

	calcDeath(leftAngle) {
		let rightAngle =
			(leftAngle + (5 * (2 * Math.PI)) / 6) % (2 * Math.PI);
		if (leftAngle < rightAngle) {
			gameOver = this.angle > leftAngle && this.angle < rightAngle;
		} else {
			gameOver = this.angle > leftAngle || this.angle < rightAngle;
		}
		if (!gameOver) {
			score++;
			scoreHTML.textContent = score;
			setColors();
			if (score % 5 == 0) {
				difficulty += 0.2;
			}
		}
	}

	draw() {
		fill(mainColor);
		circle(center[0] + this.x, center[1] + this.y, 10);
	}
}
