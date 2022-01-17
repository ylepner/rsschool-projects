import renderGaragePage from './components/garage';
import renderWinnersPage from './components/winners';
import './style.css';

document.querySelector('.go-to-garage').addEventListener('click', () => {
  goToGaragePage();
});

function goToGaragePage() {
  document.querySelector('.main-container').innerHTML = '';
  document.querySelector('.main-container').appendChild(renderGaragePage());
}

document.querySelector('.go-to-winners').addEventListener('click', () => {
  goToWinnersPage();
});

function goToWinnersPage() {
  document.querySelector('.main-container').innerHTML = '';
  document.querySelector('.main-container').appendChild(renderWinnersPage());
}

goToGaragePage();
