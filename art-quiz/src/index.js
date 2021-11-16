import Home from './components/home'
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
  categorySelected: (category) => console.log('category selected ' + category)
})
const result = homePage.render()
document.querySelector('.main-container').appendChild(result)
