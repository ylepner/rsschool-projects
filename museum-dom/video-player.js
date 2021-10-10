const player = document.querySelector('.player')
const bigPlayButton = player.querySelector('.player-btn-play-big')
const video = player.querySelector('video')


bigPlayButton.onclick = () => {
  video.play()
  player.classList.add('is-playing')
}


