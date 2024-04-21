class HexagonSpawn {
	constructor(count) {
		this.count = count;
		this.hexagons = [];
		let hexagonSpawner = window.setInterval(() => {
			this.hexagons.push(new Hexagon(400));
		}, difficulty * 600);
	}

	draw() {
		this.hexagons.forEach((hexagon, index) => {
			hexagon.draw();
		});
	}
}
