import './style.css';
import html from './index.html';
import renderCar from '../car/car';
import { Car, CreateCarRequest } from '../../models/models';
import {
  createCar, getCarsInGarage, removeCar, updateCar,
} from '../../garage-api';

export default function renderGaragePage() {
  const template = document.createElement('div');
  template.innerHTML = html;

  async function getAndSetCars() {
    const data = await getCarsInGarage();
    data.forEach((el: Car) => {
      renderCarRow(el);
    });
  }

  getAndSetCars();

  // create car

  const inputCreateCar = template.querySelector('.create-input') as HTMLInputElement;
  const colorSelector = template.querySelector('.color-create') as HTMLInputElement;
  const inputUpdateCar = template.querySelector('.update-input') as HTMLInputElement;
  const colorSelectorUpdate = template.querySelector('.color-update') as HTMLInputElement;
  const createBtn = template.querySelector('.create-btn') as HTMLButtonElement;
  createBtn.addEventListener('click', () => {
    addCarToServer();
  });
  const updateBtn = template.querySelector('.update-btn') as HTMLButtonElement;

  async function addCarToServer() {
    if (!inputCreateCar.value) {
      alert('No name');
    }
    const req: CreateCarRequest = {
      color: colorSelector.value,
      name: inputCreateCar.value,
    };
    const newCar = await createCar(req);
    renderCarRow(newCar);
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
        updateBtn.addEventListener('click', async () => {
          const updatedCar: Car = {
            color: colorSelectorUpdate.value,
            name: inputUpdateCar.value,
            id: car.id,
          };
          await updateCar(updatedCar);
          el.querySelector('g').style.fill = colorSelectorUpdate.value;
          const name = el.querySelector('.car-name') as HTMLElement;
          name.innerHTML = inputUpdateCar.value;
        });
      },
    });
    template.querySelector('.garage').appendChild(el);
  }

  // race button

  const raceBtn = template.querySelector('.race-btn') as HTMLButtonElement;
  raceBtn.addEventListener('click', () => {
    template.querySelectorAll('svg').forEach((el: SVGSVGElement) => {
      el.classList.add('animate');
      el.onanimationend = () => {
        el.classList.add('stop-car');
      };
    });
  });
  const resetBtn = template.querySelector('.reset-btn') as HTMLButtonElement;
  resetBtn.addEventListener('click', () => {
    template.querySelectorAll('svg').forEach((el: SVGSVGElement) => {
      el.classList.remove('stop-car');
      el.classList.remove('animate');
    });
  });
  return template;
}
