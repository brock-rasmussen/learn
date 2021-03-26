const player = document.querySelector('.player');

const video = player.querySelector('video');
const toggle = player.querySelector('[data-toggle]');

// play and pause
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// update play/pause button
function updatePlayButton() {
    toggle.innerHTML = this.paused ? '&#x23f5;' : '&#x23f8;';
}

video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);

// skip forward/back
const skipButtons = player.querySelectorAll('[data-skip]');

function skip() {
    video.currentTime += +this.dataset.skip;
}

skipButtons.forEach(button => button.addEventListener('click', skip));

// range update
const ranges = player.querySelectorAll('.player__slider');

function updateRange() {
    video[this.name] = this.value;
}

ranges.forEach(range => range.addEventListener('input', updateRange));

// progress update
const progress = player.querySelector('.player__progress');
const progressBar = player.querySelector('.player__progress-bar');

function updateProgress() {
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`
}

video.addEventListener('timeupdate', updateProgress);

// scrub the progress bar
function scrub(e) {
    video.currentTime = e.offsetX / progress.offsetWidth * video.duration;
}

progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => progress.addEventListener('mousemove', scrub));
progress.addEventListener('mouseup', () => progress.removeEventListener('mousemove', scrub));