const player = document.querySelector('.player')
const bigPlayButton = player.querySelector('.player-btn-play-big')
const video = player.querySelector('video')
const smallPlayButton = player.querySelector('.button-small-play')
const smallPauseButton = player.querySelector('.button-small-pause')


bigPlayButton.onclick = play
smallPauseButton.onclick = stop

function play() {
  video.play()
  player.classList.add('is-playing')
}

function stop() {
  video.pause()
  player.classList.remove('is-playing')
}

