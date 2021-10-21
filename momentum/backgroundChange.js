setBackgroundImg()

function getImageNumber() {
  let imageNumber = Math.floor(Math.random() * 20) + 1
  let formattedNumber = ("0" + imageNumber).slice(-2);
  return formattedNumber
}

let imageNumber = getImageNumber()

function createImageLink() {
  const timeOfDay = getGreeting()
  const imageNumber = getImageNumber()
  return `https://raw.githubusercontent.com/ylepner/stage1-tasks/assets/images/${timeOfDay}/${imageNumber}.jpg`
}

function setBackgroundImg() {
  return document.body.style.backgroundImage = `url('${createImageLink()}')`
}

const prevImg = document.querySelector('.slide-prev')
const nextImg = document.querySelector('.slide-next')

prevImg.onclick = getSlidePrev
nextImg.onclick = getSlideNext

function getSlidePrev() {
  console.log(imageNumber)
}
