import './style.css';
import 'nouislider/dist/nouislider.css';
import './self-check';
import { renderHome } from './components/main-page/index';
import { renderTree } from './components/tree/index';

// goToPage

function goToHomePage() {
  document.querySelector('.search-bar').classList.add('invisible');
  document.querySelector('.counter-ball').classList.add('invisible');
  document.querySelector('.main-container').innerHTML = '';
  document.querySelector('.main-container').appendChild(renderHome());
  document.querySelector('.start-game').addEventListener('click', () => {
    goToTreePage();
  });
}

document.querySelector('.to-home-btn').addEventListener('click', () => {
  goToHomePage();
});

document.querySelector('.link-toys-page').addEventListener('click', () => {
  goToToysPage();
});

goToHomePage();

function goToToysPage() {
  document.querySelector('.search-bar').classList.remove('invisible');
  document.querySelector('.counter-ball').classList.remove('invisible');
}

function goToTreePage() {
  document.querySelector('.search-bar').classList.add('invisible');
  document.querySelector('.counter-ball').classList.add('invisible');
  document.querySelector('.main-container').innerHTML = '';
  document.querySelector('.main-container').appendChild(renderTree());
}

goToTreePage();
