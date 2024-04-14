class Hexagon {
	constructor(size) {
		this.size = size;
		this.originalSize = size;
		this.angle = Math.random() * Math.PI * 2;
		this.center = [width / 2, height / 2];
	}

	draw() {
		this.resize(2);
		noFill();
		stroke(255);
		strokeWeight(10);
		strokeJoin(MITER);
		beginShape();
		for (let i = 0; i < 6; i++) {
			let newAngle = ((2 * Math.PI) / 6) * i + this.angle;
			let x = this.size * Math.cos(newAngle);
			let y = this.size * Math.sin(newAngle) * -1;
			vertex(this.center[0] + x, this.center[1] + y);
		}
		endShape();
	}

	resize(value) {
		this.size -= value;
		if (this.size == 30) {
			player.calcDeath(this.angle);
		}
		if (this.size < 1) {
			this.restart();
		}
	}

	restart() {
		this.size = this.originalSize;
		this.angle = Math.random() * Math.PI * 2;
	}
}
