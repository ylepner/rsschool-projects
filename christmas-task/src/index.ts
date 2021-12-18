import './style.css';
import data from './data';
import { render } from './components/card/card';
import { Cart } from './models/models';
import { toggleElement } from './utils';

// добавление в корзину

const cart: Cart = {
  itemIds: [],
};

interface Filter {
  shape: string[];
  color: string[];
  size: string[];
  favorite: boolean;
  amountMin?: number;
  amountMax?: number;
  yearMin?: number;
  yearMax?: number;
}

const filterState: Filter = {
  shape: [],
  color: [],
  size: [],
  favorite: false,
};

function createUpdateFilterCallback(fn: (event: Event) => Filter) {
  return (event: Event) => {
    const filter = fn(event);
    console.log('Update interaface here with filter', filter);
    const data = filterData(filter);
    addCards(data);
  };
}

// filtres by forms

document.querySelectorAll('.forms-btn').forEach((el: HTMLElement) => {
  const func = () => {
    filterState.shape = toggleElement(filterState.shape, el.dataset.shape);
    el.classList.toggle('active');
    return filterState;
  };
  el.addEventListener('click', createUpdateFilterCallback(func));
});

// filtres by color

document.querySelectorAll('.color-btn').forEach((el: HTMLElement) => {
  const func = () => {
    filterState.color = toggleElement(filterState.color, el.dataset.color);
    el.classList.toggle('active');
    return filterState;
  };
  const callback = createUpdateFilterCallback(func);
  el.addEventListener('click', callback);
});

// filtres by size

document.querySelectorAll('.size-btn').forEach((el: HTMLElement) => {
  const func = () => {
    filterState.size = toggleElement(filterState.size, el.dataset.size);
    el.classList.toggle('active');
    return filterState;
  };
  el.addEventListener('click', createUpdateFilterCallback(func));
});

// filtres by favorites

document.getElementById('checkbox').addEventListener('change', createUpdateFilterCallback((event) => {
  const target = event.target as HTMLInputElement;
  filterState.favorite = target.checked;
  return filterState;
}));

function filterData(filter: Filter) {
  return data.filter((el) => {
    if (filter.shape.length > 0) {
      if (!filter.shape.includes(el.shape)) {
        return false;
      }
    }
    if (filter.color.length > 0) {
      if (!filter.color.includes(el.color)) {
        return false;
      }
    }
    if (filter.size.length > 0) {
      if (!filter.size.includes(el.size)) {
        return false;
      }
    }
    if (filter.favorite && !el.favorite) {
      return false;
    }
    return true;
  });
}

// counter of favorite items

const countBall = document.querySelector('.count');

function addToCart(cardNum: number) {
  if (cart.itemIds.includes(cardNum)) {
    cart.itemIds = cart.itemIds.filter((id) => id !== cardNum);
  } else {
    if (cart.itemIds.length >= 2) {
      alert('Извините, все слоты заполнены');
      return;
    }
    cart.itemIds.push(cardNum);
  }
  countBall.innerHTML = `${cart.itemIds.length}`;
}

// вывести карточки с игрушками

function addCards(cardsData: any[]) {
  document.querySelector('.cards')!.innerHTML = '';
  cardsData.forEach((item, i) => {
    const card = render({
      card: item,
      onFavoriteClicked: () => {
        addToCart(i);
        if (cart.itemIds.includes(i)) {
          card.querySelector('.like-btn').classList.add('favorite');
        } else {
          card.querySelector('.like-btn').classList.remove('favorite');
        }
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
