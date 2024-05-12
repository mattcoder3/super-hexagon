document.addEventListener('keydown', function (event) {
	// Check if the pressed key is an arrow key (left, right, up, down)
	if (
		event.key === 'ArrowUp' ||
		event.key === 'ArrowDown' ||
		event.key === 'ArrowLeft' ||
		event.key === 'ArrowRight' ||
		event.key === ' '
	) {
		// Prevent the default scroll behavior
		event.preventDefault();
	}
});

const volumeButton = document.getElementById('volume-button');
const volumeIcon = document.getElementById('volume-icon');

volumeButton.addEventListener('click', (e) => {
	gameVolume = gameVolume === 0 ? 0.3 : 0;
	music.volume = gameVolume;
	volumeIcon.classList.toggle('fa-volume-high');
	volumeIcon.classList.toggle('fa-volume-xmark');
});
