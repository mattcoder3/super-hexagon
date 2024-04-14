class Player {
	constructor(angle) {
		this.angle = angle;
		this.radius = 30;
		this.center = [width / 2, height / 2];
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

	calcDeath(hexAngle) {
		let diff = hexAngle - this.angle;
		if (!(diff > 0 && diff < (2 * Math.PI) / 6)) {
			gameOver = true;
		}
	}

	draw() {
		fill(255);
		circle(this.center[0] + this.x, this.center[1] + this.y, 10);
	}
}
