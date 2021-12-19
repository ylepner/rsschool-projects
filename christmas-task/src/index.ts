import './style.css';
import noUiSlider from 'nouislider';
import data from './data';
import { render } from './components/card/card';
import {
  Cart, SortFunction, Filter, Query, Card,
} from './models/models';
import { toggleElement } from './utils';
import 'nouislider/dist/nouislider.css';
import './slider.css';

// добавление в корзину

const cart: Cart = {
  itemIds: [],
};

const filterState: Filter = {
  shape: [],
  color: [],
  size: [],
  favorite: false,
};

const queryState: Query = {
  filter: filterState,
};

function createUpdateDataQueryCallback<T>(fn: (event: T) => Query) {
  return (event: T) => {
    const query = fn(event);
    console.log(query.filter);
    const dataFromData = filterData(query.filter);
    if (query.sorting) {
      dataFromData.sort(sortings[query.sorting]);
    }
    addCards(dataFromData);
  };
}

function createUpdateFilterCallback<T>(fn: (event: T) => Filter) {
  return createUpdateDataQueryCallback<T>((ev) => {
    const filter = fn(ev);
    queryState.filter = filter;
    return queryState;
  });
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
    if (filter.search) {
      if (!el.name.toLowerCase().includes(filter.search.toLowerCase())) {
        return false;
      }
    }
    if (filter.yearMin) {
      if (Number(el.year) < filter.yearMin) {
        return false;
      }
    }
    if (filter.yearMax) {
      if (Number(el.year) > filter.yearMax) {
        return false;
      }
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

// sorting

const selectElement: HTMLSelectElement = document.querySelector('#sorting');

selectElement.addEventListener('change', createUpdateDataQueryCallback(() => {
  queryState.sorting = selectElement.value;
  return queryState;
}));

const sortByNameAsc: SortFunction = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};
const sortByNameDesc: SortFunction = (a, b) => sortByNameAsc(a, b) * -1;
const sortByYearAsc: SortFunction = (a, b) => {
  if (a.year < b.year) return -1;
  if (a.year > b.year) return 1;
  return 0;
};

const sortByYearDesc: SortFunction = (a, b) => sortByYearAsc(a, b) * -1;

const sortings = {
  sortByNameAsc,
  sortByNameDesc,
  sortByYearAsc,
  sortByYearDesc,
};

// search

const searchBar = document.getElementById('search-input') as HTMLInputElement;
searchBar.addEventListener('input', createUpdateFilterCallback(() => {
  filterState.search = searchBar.value;
  return filterState;
}));

const slider = noUiSlider.create(document.querySelector('.year-bar'), {
  start: [1940, 2020],
  connect: true,
  range: {
    'min': 1940,
    'max': 2020,
  },
  step: 10,
});

slider.on('change', createUpdateFilterCallback((event) => {
  filterState.yearMin = Number.parseInt(event[0] as string);
  filterState.yearMax = Number.parseInt(event[1] as string);
  document.querySelector('.filter-item-min').innerHTML = String(filterState.yearMin);
  document.querySelector('.filter-item-max').innerHTML = String(filterState.yearMax);
  return queryState.filter;
}));
