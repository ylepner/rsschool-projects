import './style.css';
import html from './index.html';
import renderCar from '../car/car';
import { Car, CreateCarRequest } from '../../models/models';
import {
  createCar, getCarsInGarage, removeCar, updateCar,
} from '../../garage-api';
import { getRandomCar } from '../../car-generator';
import { queryElement } from '../../utils';

const PAGE_LIMIT = 7;
export default function renderGaragePage() {
  let currentPage = 1;
  const template = document.createElement('div');
  template.innerHTML = html;
  let carRows: Array<ReturnType<typeof renderCarRow>>;
  async function getAndSetCars() {
    const data = await getCarsInGarage({ page: currentPage, limit: PAGE_LIMIT });
    template.querySelector('.garage').innerHTML = '';
    carRows = data.cars.map((el: Car) => renderCarRow(el));
    queryElement(template, 'span', '.cars-count').innerText = String(data.count);
    updateButtons(data.count);
  }

  function updateButtons(count: number) {
    if (currentPage === 1) {
      queryElement(template, 'span', '.page-number').innerText = String(currentPage);
      prevBtn.classList.add('not-clickable');
    }
    if (currentPage > 1) {
      queryElement(template, 'span', '.page-number').innerText = String(currentPage);
      prevBtn.classList.remove('not-clickable');
    }
    if (currentPage >= (count / PAGE_LIMIT)) {
      nextBtn.classList.add('not-clickable');
    } else {
      nextBtn.classList.remove('not-clickable');
    }
  }

  getAndSetCars();

  const inputCreateCar = template.querySelector('.create-input') as HTMLInputElement;
  const colorSelector = template.querySelector('.color-create') as HTMLInputElement;
  const inputUpdateCar = template.querySelector('.update-input') as HTMLInputElement;
  const colorSelectorUpdate = template.querySelector('.color-update') as HTMLInputElement;
  const createBtn = template.querySelector('.create-btn') as HTMLButtonElement;
  createBtn.addEventListener('click', () => {
    if (!inputCreateCar.value) {
      alert('No name');
      return;
    }
    addCarToServer({ color: colorSelector.value, name: inputCreateCar.value });
  });
  const updateBtn = template.querySelector('.update-btn') as HTMLButtonElement;

  // create car

  async function addCarToServer(req: CreateCarRequest) {
    await createCar(req);
    getAndSetCars();
  }

  // update, remove car

  function renderCarRow(car: Car) {
    const el = renderCar({
      car,
      onRemove: async () => {
        await removeCar(car.id);
        el.template.remove();
      },
      onSelect: async () => {
        template.querySelector('.update').classList.remove('not-clickable');
        updateBtn.onclick = async () => {
          const updateInput = template.querySelector('.update-input') as HTMLInputElement;
          updateInput.value = '';
          template.querySelector('.update').classList.add('not-clickable');
          const updatedCar: Car = {
            color: colorSelectorUpdate.value,
            name: inputUpdateCar.value,
            id: car.id,
          };
          await updateCar(updatedCar);
          el.template.querySelector('g').style.fill = colorSelectorUpdate.value;
          const name = el.template.querySelector('.car-name') as HTMLElement;
          name.innerHTML = inputUpdateCar.value;
        };
      },
    });
    template.querySelector('.garage').appendChild(el.template);
    return el;
  }

  // race and reset button

  const raceBtn = template.querySelector('.race-btn') as HTMLButtonElement;
  const resetBtn = template.querySelector('.reset-btn') as HTMLButtonElement;
  raceBtn.addEventListener('click', async () => {
    raceBtn.classList.add('not-clickable');
    resetBtn.classList.remove('not-clickable');
    const startedCars = carRows.map((el) => el.rideCar());
    const result = await Promise.all(startedCars);
    const promises = result.map((el) => el());
    const winner = await promiseAnyWithResult(promises, (el) => el.rideResult);
    template.querySelector('.winner-info').classList.remove('disabled');
    template.querySelector('.winner-info').innerHTML = `${winner.car.name} WON! 🏆 Time ${Math.floor(winner.time * 100) / 100}`;
  });

  resetBtn.addEventListener('click', () => {
    template.querySelector('.winner-info').classList.add('disabled');
    raceBtn.classList.remove('not-clickable');
    resetBtn.classList.add('not-clickable');
    carRows.forEach((el) => {
      el.restart();
    });
  });

  // generate 100 cars

  const generateCars = template.querySelector('.generate-btn') as HTMLButtonElement;
  generateCars.addEventListener('click', () => {
    template.querySelector('.winner-info').classList.add('disabled');
    for (let i = 0; i < 10; i += 1) {
      addCarToServer(getRandomCar());
    }
  });

  // next/prev page

  const nextBtn = template.querySelector('.next-btn');
  nextBtn.addEventListener('click', () => {
    currentPage += 1;
    getAndSetCars();
  });

  const prevBtn = template.querySelector('.prev-btn');
  prevBtn.addEventListener('click', () => {
    if (currentPage >= 1) {
      currentPage -= 1;
      getAndSetCars();
    }
  });

  return template;
}

function promiseAnyWithResult<T>(promises: Promise<T>[], filter: (el: T) => boolean): Promise<T> {
  let flag = false;
  return new Promise<T>((resolve) => {
    promises.forEach((promise) => {
      promise.then((result) => {
        if (flag) {
          return;
        }
        if (filter(result)) {
          resolve(result);
          flag = true;
        }
      });
    });
  });
}
