import './style.css';
import data from './data';
import { render } from './components/card/card';
import { Cart } from './models/models';

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

// вывести карточки с игрушками

function addCards(cardsData: any[]) {
  document.querySelector('.cards').innerHTML = '';
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

//  sortind by name ascending

const sortDataByNameAsc = [...data].sort((a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
});

// sortind by name descenfing

const sortDataByNameDesc = [...data].sort((a, b) => {
  if (a.name > b.name) return -1;
  if (a.name < b.name) return 1;
  return 0;
});

// sorting by year ascending

const sortDataByYearAsc = [...data].sort((a, b) => {
  if (a.year < b.year) return -1;
  if (a.year > b.year) return 1;
  return 0;
});

// sorting by year descending

const sortDataByYearDesc = [...data].sort((a, b) => {
  if (a.year > b.year) return -1;
  if (a.year < b.year) return 1;
  return 0;
});

const selectElement: HTMLSelectElement = document.querySelector('#sorting');
selectElement.addEventListener('change', () => {
  const selectValue = selectElement.value;
  if (selectValue === 'alphabet-asc') {
    addCards(sortDataByNameAsc);
  }
  if (selectValue === 'alphabet-desc') {
    addCards(sortDataByNameDesc);
  }
  if (selectValue === 'year-asc') {
    addCards(sortDataByYearAsc);
  }
  if (selectValue === 'year-desc') {
    addCards(sortDataByYearDesc);
  }
  if (selectValue === 'default') {
    addCards(data);
  }
});

// filtres by forms

document.querySelector('.ball').addEventListener('click', (event) => {
  console.log(event)
  const filterBallShape = [...data].filter((el) => {
    return el.shape === 'шар';
  })
  addCards(filterBallShape);
})
