import renderGaragePage from './components/garage';
import renderWinnersPage from './components/winners';
import './style.css';
import './self-check';

document.body.innerHTML = `<footer>
<div class="nav-pannel">
  <button class="go-to-garage green">TO GARAGE</button>
  <button class="go-to-winners green">TO WINNERS</button>
</div>
</footer>
<div class="main-container">
</div>`;

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
