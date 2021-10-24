let ghImgCount = Math.floor(Math.random() * IMAGES_NUMBER)

function getGithubImgLink(timeOfDay, direction) {
  const IMAGES_NUMBER = 20
  function getImageNumber() {
    let imageNumber = ghImgCount + 1
    let formattedNumber = ("0" + imageNumber).slice(-2);
    return formattedNumber
  }
  function createImageLink() {
    let imageNumber = getImageNumber()
    return `https://raw.githubusercontent.com/ylepner/stage1-tasks/assets/images/${timeOfDay}/${imageNumber}.jpg`
  }
  return createImageLink()




}
function getUnsplashImgLink(timeOfDay, direction) {
  const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=YmRf6tbCjZshQ_2rmRKFBAHth_VHDF-3Ba_U_k26cd8';
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      return data.urls.regular
    });
}
function getFlickrImgLink(timeOfDay, direction) {

}


function getLinkToImage() {

}

const providers = {
  github: getGithubImgLink,
  unsplash: getUnsplashImgLink,
  flickr: getFlickrImgLink
}

async function getLinkToImage(provider, timeOfDay, direction) {
  return await providers[provider](timeOfDay, direction)
}