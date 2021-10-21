setBackgroundImg()

function getImageNumber() {
  let imageNumber = Math.floor(Math.random() * 20) + 1
  let formattedNumber = ("0" + imageNumber).slice(-2);
  console.log(formattedNumber)
  return formattedNumber
}


function createImageLink() {
  let timeOfDay = getGreeting()
  let imageNumber = getImageNumber()
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
  console.log(1)
}

function getSlideNext() {
  console.log(2)
}
