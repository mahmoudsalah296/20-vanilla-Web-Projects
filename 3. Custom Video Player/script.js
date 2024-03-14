const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

video.addEventListener('click', toggleStatus);
video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleStatus);
stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);

function toggleStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateIcon() {
  if (video.paused) {
    play.querySelector('.fa').classList = 'fa fa-play fa-2x';
  } else {
    play.querySelector('.fa').classList = 'fa fa-pause fa-2x';
  }
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  let min = Math.floor(video.currentTime / 60);
  let seconds = Math.floor(video.currentTime % 60);

  if (min < 10) {
    min = '0' + String(min);
  }

  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }

  timestamp.innerText = `${min}:${seconds}`;
}

function setVideoProgress() {
  video.currentTime = (+progress.value / 100) * video.duration;
}
