const player = document.querySelector('.player')
const bigPlayButton = player.querySelector('.player-btn-play-big')
const video = player.querySelector('video')
const smallPlayButton = player.querySelector('.button-small-play')
const smallPauseButton = player.querySelector('.button-small-pause')
let active = false


bigPlayButton.onclick = play
smallPauseButton.onclick = stop
smallPlayButton.onclick = play

if (player.onclick) {
  if (active === false) {
    play
    active = true
  } else if (active === true) {
    stop
    active = false
  }
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

