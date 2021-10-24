const IMAGES_NUMBER = 20
let ghImgCount = Math.floor(Math.random() * IMAGES_NUMBER)


function getNextGithubImgLink(timeOfDay, direction) {
  ghImgCount = mod(ghImgCount + direction, IMAGES_NUMBER)
  function getImageNumber() {
    let imageNumber = ghImgCount + 1
    let formattedNumber = ("0" + imageNumber).slice(-2);
    return formattedNumber
  }
  function createImageLink() {
    let imageNumber = getImageNumber()
    return `https://raw.githubusercontent.com/ylepner/stage1-tasks/assets/images/${timeOfDay}/${imageNumber}.jpg`
  }
  return Promise.resolve(createImageLink());
}

function getUnsplashImgLink(timeOfDay, direction) {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay},nature&client_id=YmRf6tbCjZshQ_2rmRKFBAHth_VHDF-3Ba_U_k26cd8`;
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      return data.urls.regular
    });
}
function getFlickrImgLink(timeOfDay, direction) {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=663e412e55faaeadb0a6fa7f0801a36f&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      const photos = data.photos.photo
      const index = Math.round(Math.random(0, 1) * photos.length)
      return data.photos.photo[index].url_l
    });
}
getFlickrImgLink()


function getNextLinkToImage(timeOfDay, direction) {
  let currentProvider = getProviderFromState()
  return getNextGithubImgLink(timeOfDay, direction)
}

const providers = {
  github: getNextGithubImgLink,
  unsplash: getUnsplashImgLink,
  flickr: getFlickrImgLink
}

function getLinkToImage(provider, timeOfDay, direction) {
  return providers[provider](timeOfDay, direction)
}

