import Home from './components/home'
import CategoryPicker from './components/category-picker'
import Settings from './components/settings'
/* const createImage = (src) => new Promise((res, rej) => {
  const img = new Image();
  img.onload = () => res(img);
  img.onerror = rej;
  img.src = src;
});

async function render() {
  const subHeader = document.createElement('h2');
  subHeader.innerHTML = 'This elements was created by js';
  const myImage = await createImage(image);
  document.body.appendChild(subHeader);
  document.body.appendChild(myImage);
}

render(); */

const homePage = new Home({
  categorySelected: (category) => {
    console.log('category selected ' + category)
    const categoryPage = new CategoryPicker()
    const categoryResult = categoryPage.render()
    clearNode(document.querySelector('.main-container'))
    document.querySelector('.main-container').appendChild(categoryResult)
  },
  onSettingsClick: () => {
    const settingsPage = new Settings()
    const settingsResult = settingsPage.render()
    clearNode(document.querySelector('.main-container'))
    document.querySelector('.main-container').appendChild(settingsResult)
  }
})
const result = homePage.render()
document.querySelector('.main-container').appendChild(result)

function clearNode(node) {
  node.innerHTML = ''
}

