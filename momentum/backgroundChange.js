const IMAGES_NUMBER = 20
let count = Math.floor(Math.random() * IMAGES_NUMBER)
let timeOfDay = getTimeOfDay()


function getImageNumber() {
  let imageNumber = ghImgCount + 1
  let formattedNumber = ("0" + imageNumber).slice(-2);
  return formattedNumber
}


function createImageLink() {
  let imageNumber = getImageNumber()
  return `https://raw.githubusercontent.com/ylepner/stage1-tasks/assets/images/${timeOfDay}/${imageNumber}.jpg`
}

function setBackgroundImg() {
  const img = new Image();
  const imageLink = createImageLink()
  img.src = imageLink
  img.onload = () => {
    document.body.style.backgroundImage = `url('${imageLink}')`
  };
}

const prevImg = document.querySelector('.slide-prev')
const nextImg = document.querySelector('.slide-next')

prevImg.onclick = setPrevSlide
nextImg.onclick = setNextSlide

function setPrevSlide() {
  ghImgCount = mod(ghImgCount - 1, IMAGES_NUMBER)
  console.log(ghImgCount)
  setBackgroundImg()
}

function setNextSlide() {
  ghImgCount = (ghImgCount + 1) % IMAGES_NUMBER
  setBackgroundImg()
}

setBackgroundImg()
