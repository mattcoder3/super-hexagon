class Hexagon {
	constructor(size) {
		this.size = size;
		this.angle = Math.random() * Math.PI * 2;
		this.alive = true;
	}

	draw() {
		this.resize(difficulty);
		noFill();
		stroke(mainColor + '96');
		strokeWeight(Math.sqrt(this.size) * 2);
		strokeJoin(MITER);
		beginShape();
		for (let i = 0; i < 6; i++) {
			let newAngle = ((2 * Math.PI) / 6) * i + this.angle;
			let x = this.size * Math.cos(newAngle);
			let y = this.size * Math.sin(newAngle) * -1;
			vertex(center[0] + x, center[1] + y);
		}
		endShape();
	}

	resize(value) {
		this.size = Math.max(this.size - value, 0);
		if (this.size < 30 && this.alive) {
			this.alive = false;
			player.calcDeath(this.angle);
		}
	}
}
