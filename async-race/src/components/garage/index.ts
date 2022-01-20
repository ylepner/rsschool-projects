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

  async function getAndSetCars() {
    const data = await getCarsInGarage({ page: currentPage, limit: PAGE_LIMIT });
    template.querySelector('.garage').innerHTML = '';
    data.cars.forEach((el: Car) => {
      renderCarRow(el);
    });
    queryElement(template, 'span', '.cars-count').innerText = String(data.count);
    queryElement(template, 'span', '.page-number').innerText = String(currentPage);
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
        el.remove();
      },
      onSelect: async () => {
        template.querySelector('.update').classList.remove('not-clickable');
        updateBtn.onclick = async () => {
          const updatedCar: Car = {
            color: colorSelectorUpdate.value,
            name: inputUpdateCar.value,
            id: car.id,
          };
          await updateCar(updatedCar);
          el.querySelector('g').style.fill = colorSelectorUpdate.value;
          const name = el.querySelector('.car-name') as HTMLElement;
          name.innerHTML = inputUpdateCar.value;
        };
      },
    });
    template.querySelector('.garage').appendChild(el);
  }

  // race and reset button

  const raceBtn = template.querySelector('.race-btn') as HTMLButtonElement;
  const resetBtn = template.querySelector('.reset-btn') as HTMLButtonElement;
  raceBtn.addEventListener('click', () => {
    resetBtn.classList.toggle('not-clickable');
    raceBtn.classList.toggle('not-clickable');
    template.querySelectorAll('.a-btn').forEach((el: HTMLButtonElement) => {
      el.classList.add('not-clickable');
    });
    template.querySelectorAll('.b-btn').forEach((el: HTMLButtonElement) => {
      el.classList.remove('not-clickable');
    });
    template.querySelectorAll('svg').forEach((el: SVGSVGElement) => {
      el.classList.add('animate');
      el.onanimationend = () => {
        el.classList.add('stop-car');
      };
    });
  });

  resetBtn.addEventListener('click', () => {
    raceBtn.classList.toggle('not-clickable');
    resetBtn.classList.toggle('not-clickable');
    template.querySelectorAll('.a-btn').forEach((el: HTMLButtonElement) => {
      el.classList.remove('not-clickable');
    });
    template.querySelectorAll('.b-btn').forEach((el: HTMLButtonElement) => {
      el.classList.add('not-clickable');
    });
    template.querySelectorAll('svg').forEach((el: SVGSVGElement) => {
      el.classList.remove('stop-car');
      el.classList.remove('animate');
    });
  });

  // generate 100 cars

  const generateCars = template.querySelector('.generate-btn') as HTMLButtonElement;
  generateCars.addEventListener('click', () => {
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
    currentPage -= 1;
    getAndSetCars();
  });

  return template;
}
