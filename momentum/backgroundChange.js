const IMAGES_NUMBER = 20
let count = Math.floor(Math.random() * IMAGES_NUMBER)
let timeOfDay = getTimeOfDay()


function getImageNumber() {
  let imageNumber = count + 1
  let formattedNumber = ("0" + imageNumber).slice(-2);
  return formattedNumber
}


function createImageLink() {
  let imageNumber = getImageNumber()
  return `https://raw.githubusercontent.com/ylepner/stage1-tasks/assets/images/${timeOfDay}/${imageNumber}.jpg`
}

function setBackgroundImg() {
  return document.body.style.backgroundImage = `url('${createImageLink()}')`
}

const prevImg = document.querySelector('.slide-prev')
const nextImg = document.querySelector('.slide-next')

prevImg.onclick = setPrevSlide
nextImg.onclick = setNextSlide

function setPrevSlide() {
  count = mod(count - 1, IMAGES_NUMBER)
  console.log(count)
  setBackgroundImg()
}

function setNextSlide() {
  count = (count + 1) % IMAGES_NUMBER
  setBackgroundImg()
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

setBackgroundImg()
