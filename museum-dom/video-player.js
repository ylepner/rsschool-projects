/* controls */

const progressVideo = document.querySelector('.progress-video');

progressVideo.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #d3d3d3 ${value}%, #d3d3d3 100%)`
})

const progressVolume = document.querySelector('.progress-volume');

progressVolume.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #d3d3d3 ${value}%, #d3d3d3 100%)`
})

document.getElementById("menu-toggle").onclick = function () {
  document.body.classList.toggle("mobile-menu-close")
  document.body.classList.toggle("mobile-menu-open")
}

/* player */

const player = document.querySelector('.player')
const bigPlayButton = player.querySelector('.player-btn-play-big')
const video = player.querySelector('video')
const smallPlayButton = player.querySelector('.button-small-play')
const smallPauseButton = player.querySelector('.button-small-pause')

let active = false


bigPlayButton.onclick = play
smallPauseButton.onclick = stop
smallPlayButton.onclick = play
video.onclick = isPlayerPlaying

function isPlayerPlaying() {
  !active ? play() : stop()
}


function play() {
  /* debugger */
  video.play()
  player.classList.add('is-playing')
  active = true
}

function stop() {
  /* debugger */
  video.pause()
  player.classList.remove('is-playing')
  active = false
}


