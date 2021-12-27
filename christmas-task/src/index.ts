import './style.css';
import 'nouislider/dist/nouislider.css';
import './self-check';
import { renderHome } from './components/main-page';
import { renderTree } from './components/tree';
import { renderToys, ToysParams } from './components/toys';
import data from './data';

const toys: ToysParams = {
  cart: {
    itemIds: [],
  },
};

function goToHomePage() {
  document.querySelector('.search-bar').classList.add('invisible');
  document.querySelector('.counter-ball').classList.add('invisible');
  document.querySelector('.main-container').innerHTML = '';
  document.querySelector('.main-container').appendChild(renderHome());
  document.querySelector('.start-game').addEventListener('click', () => {
    goToToysPage();
  });
  document.querySelector('.link-toys-page').addEventListener('click', () => {
    goToToysPage();
  });
  document.querySelector('.link-tree-page').addEventListener('click', () => {
    goToTreePage();
  });
}

document.querySelector('.to-home-btn').addEventListener('click', () => {
  goToHomePage();
});

goToHomePage();

function goToTreePage() {
  document.querySelector('.search-bar').classList.add('invisible');
  document.querySelector('.counter-ball').classList.add('invisible');
  document.querySelector('.main-container').innerHTML = '';
  const cart = toys.cart.itemIds.map((id) => ({
    toyId: id,
    amount: Number(data.find(el => el.num === id).count),
  }));
  if (cart.length === 0) {
    for (let i = 0; i < 20; i++) {
      cart.push({
        toyId: data[i].num,
        amount: Number(data[i].count),
      });
    }
  }
  document.querySelector('.main-container').appendChild(renderTree(cart));
}

function goToToysPage() {
  document.querySelector('.search-bar').classList.remove('invisible');
  document.querySelector('.counter-ball').classList.remove('invisible');
  document.querySelector('.main-container').innerHTML = '';
  document.querySelector('.main-container').appendChild(renderToys(toys));
}
