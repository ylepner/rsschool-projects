import './style.css';
import 'nouislider/dist/nouislider.css';
import noUiSlider from 'nouislider';
import './slider.css';
import data from '../../data';
import {
  Cart, Filter, Query, Card, SortFunction,
} from '../../models/models';
import { toggleElement } from '../../utils';
import { render } from '../card/card';
import html from './index.html';

export function renderToys() {
  const template = document.createElement('div');
  template.innerHTML = html;

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

  template.querySelectorAll('.forms-btn').forEach((el: HTMLElement) => {
    const func = () => {
      filterState.shape = toggleElement(filterState.shape, el.dataset.shape);
      el.classList.toggle('active');
      return filterState;
    };
    el.addEventListener('click', createUpdateFilterCallback(func));
  });

  // filtres by color

  template.querySelectorAll('.color-btn').forEach((el: HTMLElement) => {
    const func = () => {
      filterState.color = toggleElement(filterState.color, el.dataset.color);
      el.classList.toggle('active');
      return filterState;
    };
    const callback = createUpdateFilterCallback(func);
    el.addEventListener('click', callback);
  });

  // filtres by size

  template.querySelectorAll('.size-btn').forEach((el: HTMLElement) => {
    const func = () => {
      filterState.size = toggleElement(filterState.size, el.dataset.size);
      el.classList.toggle('active');
      return filterState;
    };
    el.addEventListener('click', createUpdateFilterCallback(func));
  });

  // filtres by favorites

  template.querySelector('#checkbox').addEventListener('change', createUpdateFilterCallback((event) => {
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

  const countBall = template.querySelector('.count');

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
      if (template.querySelector('.message-no-matches')) {
        template.querySelector('.message-no-matches').classList.remove('visible');
      }
    }
    template.querySelector('.cards')!.innerHTML = '';
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
      template.querySelector('.cards').appendChild(card);
      if (cart.itemIds.includes((item.num))) {
        card.querySelector('.like-btn').classList.add('favorite');
      }
    });
  }
  // addCards(data);
  // sorting

  const selectElement: HTMLSelectElement = template.querySelector('#sorting');

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

  const sliderAmount = noUiSlider.create(template.querySelector('.amount-bar'), {
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
    template.querySelector('.filter-item-amount-min').innerHTML = String(filterState.amountMin);
    template.querySelector('.filter-item-amount-max').innerHTML = String(filterState.amountMax);
    return queryState.filter;
  }));

  const sliderYear = noUiSlider.create(template.querySelector('.year-bar'), {
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
    template.querySelector('.filter-item-min').innerHTML = String(filterState.yearMin);
    template.querySelector('.filter-item-max').innerHTML = String(filterState.yearMax);
    return queryState.filter;
  }));

  // reset

  template.querySelector('.reset-filters').addEventListener('click', createUpdateFilterCallback(() => {
    queryState.filter.shape = [];
    queryState.filter.color = [];
    queryState.filter.size = [];
    queryState.filter.favorite = false;
    queryState.filter.amountMin = 1;
    queryState.filter.amountMax = 12;
    queryState.filter.yearMin = 1940;
    queryState.filter.yearMax = 2020;
    queryState.filter.search = '';
    template.querySelectorAll('.forms-btn').forEach((el: HTMLElement) => {
      el.classList.remove('active');
    });
    template.querySelectorAll('.color-btn').forEach((el: HTMLElement) => {
      el.classList.remove('active');
    });
    template.querySelectorAll('.size-btn').forEach((el: HTMLElement) => {
      el.classList.remove('active');
    });
    const favoriteCheck = template.querySelector('#checkbox') as HTMLInputElement;
    favoriteCheck.checked = false;
    sliderAmount.set([1, 12]);
    template.querySelector('.filter-item-amount-min').innerHTML = '1';
    template.querySelector('.filter-item-amount-max').innerHTML = '12';
    sliderYear.set([1940, 2020]);
    template.querySelector('.filter-item-min').innerHTML = '1940';
    template.querySelector('.filter-item-max').innerHTML = '2020';
    return queryState.filter;
  }));

  // modal window cart is full

  function showMessage() {
    template.querySelector('.overlay').classList.add('visible');
    template.querySelector('main').classList.add('main-filter');
  }

  template.querySelector('.ok-btn').addEventListener('click', () => {
    template.querySelector('.overlay').classList.remove('visible');
    template.querySelector('main').classList.remove('main-filter');
  });

  // no matches

  function showMessageNoMatches() {
    template.querySelector('.message-no-matches').classList.add('visible');
  }

  addCards(data);

  return template;
}
