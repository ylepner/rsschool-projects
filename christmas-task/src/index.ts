import './style.css';
import data from './data';
import { render } from './components/card/card';
import { Card } from './models/models';

data.forEach((dataCard: Card) => {
  const card = render(dataCard);
  document.querySelector('.cards').appendChild(card);
});

// const cardData: Card = data[0];
// const card = render(cardData);
// document.querySelector('.cards').appendChild(card);
