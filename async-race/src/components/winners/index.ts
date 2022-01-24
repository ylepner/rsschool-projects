import './style.css';
import html from './index.html';
import { getCar, getWinners } from '../../api';
import { queryElement } from '../../utils';
import { WinnersRequest } from '../../models/models';
import { iconSvg } from './car-icon';

export default function renderWinnersPage() {
  const template = document.createElement('div');
  template.innerHTML = html;
  const state: WinnersRequest = {
    page: 1,
    limit: 10,
  };
  document.querySelector('.go-to-winners').classList.add('not-clickable');
  document.querySelector('.go-to-garage').classList.remove('not-clickable');
  const table = template.querySelector('table') as HTMLTableElement;
  function renderTable() {
    const newTr = template.querySelectorAll('.new-tr');
    newTr.forEach((el) => {
      el.remove();
    });
    getWinnersArray(state).then((result) => result.forEach((res, i) => {
      const newTableRow = document.createElement('tr');
      newTableRow.classList.add('new-tr');
      newTableRow.innerHTML = `<td>${(i + 1) + (state.page - 1) * state.limit}</td><td>${iconSvg}</td><td>${res.name}</td><td>${res.wins}</td><td>${Math.floor(res.time * 100) / 100}</td>`;
      newTableRow.querySelector('g').style.fill = res.color;
      table.appendChild(newTableRow);
      updateButtons(res.count);
    }));
  }

  renderTable();

  // sorting

  template.querySelector('.wins').addEventListener('click', () => {
    if (state.order === 'ASC') {
      state.order = 'DESC';
    } else {
      state.order = 'ASC';
    }
    state.sort = 'wins';
    renderTable();
  });

  const nextWinnersBtn = template.querySelector('.winner-next-btn');
  const prevWinnersBtn = template.querySelector('.winner-prev-btn');

  function updateButtons(count: number) {
    if (state.page === 1) {
      prevWinnersBtn.classList.add('not-clickable');
    }
    if (state.page > 1) {
      prevWinnersBtn.classList.remove('not-clickable');
    }
    if (state.page >= (count / state.limit)) {
      nextWinnersBtn.classList.add('not-clickable');
    } else {
      nextWinnersBtn.classList.remove('not-clickable');
    }
  }

  nextWinnersBtn.addEventListener('click', () => {
    state.page += 1;
    queryElement(template, 'span', '.page-number').innerText = String(state.page);
    renderTable();
  });

  prevWinnersBtn.addEventListener('click', () => {
    if (state.page >= 1) {
      state.page -= 1;
    }
    queryElement(template, 'span', '.page-number').innerText = String(state.page);
    renderTable();
  });

  return template;
}

async function getWinnersArray(req: WinnersRequest) {
  const winners = await getWinners(req);
  const { count } = winners;
  const carsArray = winners.winners.map(async (winner) => {
    const car = await getCar(winner.id);
    return {
      ...car, ...winner, count,
    };
  });
  const result = await Promise.all(carsArray);
  return result;
}
