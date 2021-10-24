
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
  setBackgroundImg(getNextGithubImgLink(getTimeOfDay(), -1))
}

function setNextSlide() {
  setBackgroundImg(getNextGithubImgLink(getTimeOfDay(), 1))
}


setBackgroundImg(getNextGithubImgLink(getTimeOfDay(), 0))
