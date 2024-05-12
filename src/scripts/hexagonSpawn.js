import Hexagon from './hexagon.js';

export default class HexagonSpawn {
	constructor(p) {
		this.p = p;
		this.hexagons = [];
		this.hexagonSpawner = window.setInterval(() => {
			this.hexagons.push(new Hexagon(p));
		}, 2000 / p.difficulty);
	}

	draw() {
		this.hexagons.forEach((hexagon, index) => {
			hexagon.draw();
		});
	}

	resetInterval() {
		clearInterval(this.hexagonSpawner);
		this.hexagonSpawner = window.setInterval(() => {
			this.hexagons.push(new Hexagon(this.p));
		}, 2000 / this.p.difficulty);
	}
}
