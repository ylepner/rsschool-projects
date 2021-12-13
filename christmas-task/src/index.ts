import './style.css';
import data from './data';
import { render } from './components/card/card';
import { Cart } from './models/models';

const cart: Cart = {
  itemIds: [],
};

const countBall = document.querySelector('.count');

function addToCart(cardNum: number) {
  if (cart.itemIds.includes(cardNum)) {
    cart.itemIds = cart.itemIds.filter((id) => id !== cardNum);
  } else {
    cart.itemIds.push(cardNum);
  }
  if (cart.itemIds.length > 20) {
    alert('Извините, все слоты заполнены');
    return;
  }
  countBall.innerHTML = `${cart.itemIds.length}`;
}

function addAllCards() {
  data.forEach((dataCard, i) => {
    const card = render({
      card: dataCard,
      onFavoriteClicked: () => {
        addToCart(i);
      },
    });
    document.querySelector('.cards').appendChild(card);
  });
}

addAllCards();

