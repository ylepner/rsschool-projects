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
import './self-check';
import { renderHome } from './components/main-page/index';
import './components/main-page/index.html';
import { renderTree } from './components/tree/index';
import './components/tree/index.html';

// add to cart

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

// filter function

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
    if (filter.amountMin) {
      if (Number(el.count) < filter.amountMin) {
        return false;
      }
    }
    if (filter.amountMax) {
      if (Number(el.count) > filter.amountMax) {
        return false;
      }
    }
    return true;
  });
}

// counter of favorite items

const countBall = document.querySelector('.count');

function addToCart(cardNum: string) {
  if (cart.itemIds.includes(cardNum)) {
    cart.itemIds = cart.itemIds.filter((id) => id !== cardNum);
  } else {
    if (cart.itemIds.length >= 20) {
      showMessage();
      return;
    }
    cart.itemIds.push(cardNum);
  }
  countBall.innerHTML = `${cart.itemIds.length}`;
}

// draw toys cards

function addCards(cardsData: Card[]) {
  if (cardsData.length === 0) {
    showMessageNoMatches();
  }
  if (cardsData.length > 0) {
    if (document.querySelector('.message-no-matches')) {
      document.querySelector('.message-no-matches').classList.remove('visible');
    }
  }
  document.querySelector('.cards')!.innerHTML = '';
  cardsData.forEach((item) => {
    const card = render({
      card: item,
      onFavoriteClicked: () => {
        addToCart(item.num);
        if (cart.itemIds.includes(item.num)) {
          card.querySelector('.like-btn').classList.add('favorite');
        } else {
          card.querySelector('.like-btn').classList.remove('favorite');
        }
      },
    });
    document.querySelector('.cards').appendChild(card);
    if (cart.itemIds.includes((item.num))) {
      card.querySelector('.like-btn').classList.add('favorite');
    }
  });
}
// addCards(data);
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

// slider

const sliderAmount = noUiSlider.create(document.querySelector('.amount-bar'), {
  start: [1, 12],
  connect: true,
  range: {
    min: 1,
    max: 12,
  },
  step: 1,
});

sliderAmount.on('change', createUpdateFilterCallback((event) => {
  filterState.amountMin = Number.parseInt(event[0] as string);
  filterState.amountMax = Number.parseInt(event[1] as string);
  document.querySelector('.filter-item-amount-min').innerHTML = String(filterState.amountMin);
  document.querySelector('.filter-item-amount-max').innerHTML = String(filterState.amountMax);
  return queryState.filter;
}));

const sliderYear = noUiSlider.create(document.querySelector('.year-bar'), {
  start: [1940, 2020],
  connect: true,
  range: {
    min: 1940,
    max: 2020,
  },
  step: 10,
});

sliderYear.on('change', createUpdateFilterCallback((event) => {
  filterState.yearMin = Number.parseInt(event[0] as string);
  filterState.yearMax = Number.parseInt(event[1] as string);
  document.querySelector('.filter-item-min').innerHTML = String(filterState.yearMin);
  document.querySelector('.filter-item-max').innerHTML = String(filterState.yearMax);
  return queryState.filter;
}));

// reset

document.querySelector('.reset-filters').addEventListener('click', createUpdateFilterCallback(() => {
  queryState.filter.shape = [];
  queryState.filter.color = [];
  queryState.filter.size = [];
  queryState.filter.favorite = false;
  queryState.filter.amountMin = 1;
  queryState.filter.amountMax = 12;
  queryState.filter.yearMin = 1940;
  queryState.filter.yearMax = 2020;
  queryState.filter.search = '';
  document.querySelectorAll('.forms-btn').forEach((el: HTMLElement) => {
    el.classList.remove('active');
  });
  document.querySelectorAll('.color-btn').forEach((el: HTMLElement) => {
    el.classList.remove('active');
  });
  document.querySelectorAll('.size-btn').forEach((el: HTMLElement) => {
    el.classList.remove('active');
  });
  const favoriteCheck = document.getElementById('checkbox') as HTMLInputElement;
  favoriteCheck.checked = false;
  sliderAmount.set([1, 12]);
  document.querySelector('.filter-item-amount-min').innerHTML = '1';
  document.querySelector('.filter-item-amount-max').innerHTML = '12';
  sliderYear.set([1940, 2020]);
  document.querySelector('.filter-item-min').innerHTML = '1940';
  document.querySelector('.filter-item-max').innerHTML = '2020';
  return queryState.filter;
}));

// modal window cart is full

function showMessage() {
  document.querySelector('.overlay').classList.add('visible');
  document.querySelector('main').classList.add('main-filter');
}

document.querySelector('.ok-btn').addEventListener('click', () => {
  document.querySelector('.overlay').classList.remove('visible');
  document.querySelector('main').classList.remove('main-filter');
});

// no matches

function showMessageNoMatches() {
  document.querySelector('.message-no-matches').classList.add('visible');
}

// goToPage

function goToHomePage() {
  document.querySelector('.search-bar').classList.add('invisible');
  document.querySelector('.counter-ball').classList.add('invisible');
  document.querySelector('.main-container').innerHTML = '';
  document.querySelector('.main-container').appendChild(renderHome());
}

document.querySelector('.to-home-btn').addEventListener('click', () => {
  goToHomePage();
});

// document.querySelector('.link-toys-page').addEventListener('click', () => {
//   goToToysPage();
// });

goToHomePage();

// function goToToysPage() {
//   document.querySelector('.search-bar').classList.remove('invisible');
//   document.querySelector('.counter-ball').classList.remove('invisible');
//   addCards(data);
// }

function goToTreePage() {
  document.querySelector('.search-bar').classList.add('invisible');
  document.querySelector('.counter-ball').classList.add('invisible');
  document.querySelector('.main-container').innerHTML = '';
  document.querySelector('.main-container').appendChild(renderTree());
}

document.querySelector('.btn-start').addEventListener('click', () => {
  goToTreePage();
});

goToTreePage();