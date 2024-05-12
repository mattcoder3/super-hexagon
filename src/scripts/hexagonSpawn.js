class HexagonSpawn {
	constructor(count) {
		this.count = count;
		this.hexagons = [];
		this.hexagonSpawner = window.setInterval(() => {
			this.hexagons.push(new Hexagon(height));
		}, 2000 / difficulty);
	}

	draw() {
		this.hexagons.forEach((hexagon, index) => {
			hexagon.draw();
		});
	}

	resetInterval() {
		clearInterval(this.hexagonSpawner);
		this.hexagonSpawner = window.setInterval(() => {
			this.hexagons.push(new Hexagon(height));
		}, 2000 / difficulty);
	}
}
