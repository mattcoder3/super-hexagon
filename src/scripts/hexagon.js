export default class Hexagon {
	constructor(p) {
		this.p = p;
		this.size = p.height;
		this.angle = Math.random() * Math.PI * 2;
		this.alive = true;
	}

	draw() {
		this.resize(this.p.difficulty);
		this.p.noFill();
		this.p.stroke(this.p.mainColor + '96');
		this.p.strokeWeight(Math.sqrt(this.size) * 2);
		this.p.strokeJoin(this.p.MITER);
		this.p.beginShape();
		for (let i = 0; i < 6; i++) {
			let newAngle = ((2 * Math.PI) / 6) * i + this.angle;
			let x = this.size * Math.cos(newAngle);
			let y = this.size * Math.sin(newAngle) * -1;
			this.p.vertex(this.p.center[0] + x, this.p.center[1] + y);
		}
		this.p.endShape();
	}

	resize(value) {
		this.size = Math.max(this.size - value, 0);
		if (this.size < 30 && this.alive) {
			this.alive = false;
			this.p.player.calcDeath(this.angle);
		}
	}
}
