import './style.css';
import data from './data';
import { render } from './components/card/card';
import { Card } from './models/models';

const favorite = [] as any[];
let count = 0;
const countBall = document.querySelector('.count');

function addAllCards() {
  data.forEach((dataCard: Card) => {
    const card = render(dataCard);
    document.querySelector('.cards').appendChild(card);
  });
}

function addToFavourite(cardNum: string) {
  favorite.push(data[cardNum]);
  count += 1;
  if (count > 20) {
    alert('Извините, все слоты заполнены');
    return count;
  }
  countBall.innerHTML = `${count}`;
}

function updatePage(num) {
  document.getElementById(num).style.filter = 'brightness(1)';
}

addAllCards();

const cardContainers = document.querySelectorAll('.card-container') as NodeListOf<HTMLElement>;
for (let i = 0; i < cardContainers.length; i++) {
  const cardContainer = cardContainers[i];
  cardContainer.addEventListener('click', () => {
    addToFavourite(String(i));
    updatePage(String(i + 1));
  });
}
