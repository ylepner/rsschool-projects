/* controls */

const progressVideo = document.querySelector('.progress-video');

progressVideo.addEventListener('input', function () {

  const value = this.value;

  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #d3d3d3 ${value}%, #d3d3d3 100%)`
  video.pause()
})

progressVideo.onchange = () => {
  const value = progressVideo.value * video.duration / 100
  video.currentTime = value
  if (active) {
    video.play()
  }
}

const progressVolume = document.querySelector('.progress-volume');

progressVolume.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #d3d3d3 ${value}%, #d3d3d3 100%)`
  video.volume = value / 100
  if (video.volume > 0) {
    soundOn()
  } else {
    soundOff()
  }
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
const mute = player.querySelector('.volume-mute')
const volume = player.querySelector('.volume-on')
const fullScreen = player.querySelector('.player-btn-full')
const container = player.querySelector('.container')
let isFullScreen = false

volume.onclick = soundOff
mute.onclick = soundOn
fullScreen.onclick = openFullScreen

function soundOff() {
  video.muted = true
  player.classList.add('sound-off')
}

function soundOn() {
  video.muted = false
  player.classList.remove('sound-off')
}

function openFullScreen() {
  if (!isFullScreen) {
    player.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
  isFullScreen = !isFullScreen
}


let active = false
bigPlayButton.onclick = play
smallPauseButton.onclick = stop
smallPlayButton.onclick = play
video.onclick = isPlayerPlaying

function isPlayerPlaying() {
  !active ? play() : stop()
}


function play() {
  video.play()
  player.classList.add('is-playing')
  active = true
}

function stop() {
  video.pause()
  player.classList.remove('is-playing')
  active = false
}

video.addEventListener('ended', () => {
  stop()
})

video.ontimeupdate = (evt) => {

  if (video.paused) return;

  let value = video.currentTime / video.duration * 100
  progressVideo.value = value
  progressVideo.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #d3d3d3 ${value}%, #d3d3d3 100%)`
}
