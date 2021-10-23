const playList = [
  {
    title: 'Aqua Caelestis',
    src: 'assets/sounds/assets_sounds_Aqua Caelestis.mp3',
    duration: '00:39'
  },
  {
    title: 'River Flows In You',
    src: 'assets/sounds/assets_sounds_River Flows In You.mp3',
    duration: '01:37'
  },
  {
    title: 'Summer Wind',
    src: 'assets/sounds/assets_sounds_Summer Wind.mp3',
    duration: '01:50'
  },
  {
    title: 'Ennio Morricone',
    src: 'assets/sounds/assets_sounds_Ennio Morricone.mp3',
    duration: '01:37'
  }
]

const playListUl = document.querySelector('.play-list')

let listItems = playList
  .map((song, index) => {
    const el = document.createElement('li')
    // el.innerText = song.title
    console.log(el)
    el.innerHTML = `
    <button class="play-btn-mini player-icon">▶</button>
    <button class="pause-btn-mini player-icon">| |</button>${song.title}
    `
    const playMini = el.querySelector('.play-btn-mini')
    const pauseMini = el.querySelector('.pause-btn-mini')
    playMini.onclick = () => {
      playSong(index)
    }
    pauseMini.onclick = () => {
      pauseAudio()
    }
    return el
  })

listItems.forEach(el => playListUl.appendChild(el))


let count = 0
const player = document.querySelector('.player')
const audio = document.querySelector('audio')
const playBtn = document.querySelector('.play')
const pauseBtn = document.querySelector('.pause')
const playPrev = document.querySelector('.play-prev')
const playNext = document.querySelector('.play-next')
const songTitle = document.querySelector('.song-title')





function playAudio() {
  audio.src = playList[count].src
  setCurrentTime(0)
  audio.play();
  player.classList.add('is-playing')
  songTitle.textContent = `${playList[count].title} ${playList[count].duration} / 00:00`
  listItems[count].classList.add('is-active')
}

function pauseAudio() {
  audio.pause();
  player.classList.remove('is-playing')
}

function playSong(songNumber) {
  listItems[count].classList.toggle('is-active')
  count = songNumber
  playAudio()
}

function playOtherSong(direction) {
  playSong(mod(count + direction, playList.length))
}

function playNextSong() {
  playOtherSong(1)
}

function playPrevSong() {
  playOtherSong(-1)
}

audio.onended = () => {
  playOtherSong(1)
}

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', pauseAudio);
playNext.addEventListener('click', playNextSong);
playPrev.addEventListener('click', playPrevSong);


/* progress-bar and volume-bar */

const progressBar = document.querySelector('.progress-bar');

function getCurrentTime() {
  return audio.currentTime
}

function formatTimeMinSec() {
  const time = Math.round(getCurrentTime())
  const minutes = padNumber(Math.floor(time / 60))
  const seconds = padNumber(time % 60)
  return `${minutes}:${seconds}`
}

function padNumber(number) {
  if (number < 10) {
    return '0' + number
  }
  return String(number)
}

function setCurrentTime(time) {
  audio.currentTime = time
}

function updateTimeElements() {
  if (!audio.duration) {
    return
  }
  progressBar.value = getCurrentTime() / audio.duration * 100
  songTitle.textContent = `${playList[count].title} ${playList[count].duration} / ${formatTimeMinSec()}`
}

audio.addEventListener('timeupdate', (evt) => {
  updateTimeElements()
})

progressBar.addEventListener('input', function () {
  audio.pause()
})

progressBar.onchange = () => {
  const value = progressBar.value * audio.duration / 100
  setCurrentTime(value)
  audio.play()
}

const volumeBar = document.querySelector('.volume-bar');

volumeBar.addEventListener('input', function () {
  const value = this.value;
  audio.volume = value / 100
  if (audio.volume > 0) {
    soundOn()
  } else {
    soundOff()
  }
})

const mute = document.querySelector('.mute')
const sound = document.querySelector('.soundOn')



function soundOff() {
  audio.muted = true
  player.classList.add('sound-off')
}

function soundOn() {
  audio.muted = false
  player.classList.remove('sound-off')
}

mute.onclick = soundOn
sound.onclick = soundOff