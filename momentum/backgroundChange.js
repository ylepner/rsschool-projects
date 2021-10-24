
function setBackgroundImg(imageLink) {
  const img = new Image();
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
  count = mod(count - 1, IMAGES_NUMBER)
  setBackgroundImg()
}

function setNextSlide() {
  count = (count + 1) % IMAGES_NUMBER
  setBackgroundImg()
}


setBackgroundImg(getNextGithubImgLink(getTimeOfDay(), 0))
