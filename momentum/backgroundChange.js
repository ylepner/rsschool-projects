
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

async function setPrevSlide() {
  setBackgroundImg(await getLinkToImage(state.photoSource, getTimeOfDay(), -1))
}

async function setNextSlide() {
  setBackgroundImg(await getLinkToImage(state.photoSource, getTimeOfDay(), 1))
}

(async function () {
  setBackgroundImg(await getLinkToImage(state.photoSource, getTimeOfDay(), 0))
})()

// setSettingsEventListener('photoSource', () => {
//   setBackgroundImg()
// })