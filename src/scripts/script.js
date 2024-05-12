import { game } from './super-hexagon.js';
import { updateUserName } from './utils.js';

const p = new p5(game);

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

const editUsernameButton = document.getElementById(
	'change-username-button'
);
const usernameFormHTML = document.getElementById('username-form');
const usernameFormContainerHTML = document.getElementById(
	'username-form-container'
);

editUsernameButton.addEventListener('click', (e) => {
	usernameFormContainerHTML.style.display = 'flex';
});

function submitUsername(username) {
	p.playerUsername = updateUserName(username);
	usernameFormContainerHTML.style.display = 'none';
}

usernameFormHTML.addEventListener('submit', (e) => {
	e.preventDefault();
	const username = e.target['username-input'].value;
	submitUsername(username);
});
