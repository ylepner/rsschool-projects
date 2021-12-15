import './style.css';
import data from './data';
import { render } from './components/card/card';
import { Cart } from './models/models';

// вывести карточки с игрушками



function addCards(cardsData: any[]) {
  cardsData.forEach((item, i) => {
    const card = render({
      card: item,
      onFavoriteClicked: () => {
        addToCart(i);
      },
    });
    document.querySelector('.cards').appendChild(card);
  });
}

addCards(data);

// addCards(data);

// добавление в корзину

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

// сортировка по названию А-Я

const sortDataByNameAsc = [...data].sort(function (a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
});

// сортировка по названию Я-А

const sortDataByNameDesc = [...data].sort(function (a, b) {
  if (a.name > b.name) return -1;
  if (a.name < b.name) return 1;
  return 0;
});

const selectElement: HTMLSelectElement = document.querySelector('#sorting');
selectElement.addEventListener('change', () => {
  document.querySelector('.cards').innerHTML = '';
  const selectValue = selectElement.value;
  if (selectValue === 'alphabet-asc') {
    addCards(sortDataByNameAsc);
  }
  if (selectValue === 'alphabet-desc') {
    document.querySelector('.cards').innerHTML = '';
    addCards(sortDataByNameDesc);
  }
  if (selectValue === 'amount-asc') {
    document.querySelector('.cards').innerHTML = '';
    addCards(sortDataByNameAsc);
  }
});
