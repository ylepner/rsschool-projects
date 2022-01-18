import './style.css';
import html from './index.html';
import renderCar from '../car/car';
import { Car, CreateCarRequest } from '../../models/models';
import { createCar, getCarsInGarage } from '../../garage-api';

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
  inputCreateCar.addEventListener('change', () => {
    const newCarName = inputCreateCar.value;
  });

  const colorSelector = template.querySelector('.color-create') as HTMLInputElement;
  colorSelector.addEventListener('change', () => {
    const carColor = colorSelector.value;
  });

  const createBtn = template.querySelector('.create-btn') as HTMLButtonElement;
  createBtn.addEventListener('click', () => {
    addCarToServer();
  });

  async function addCarToServer() {
    if (!inputCreateCar.value) {
      alert('No name')
    }
    const req: CreateCarRequest = {
      color: colorSelector.value,
      name: inputCreateCar.value,
    };
    const newCar = await createCar(req);
    renderCarRow(newCar);
  }

  function renderCarRow(el: Car) {
    template.querySelector('.garage').appendChild(renderCar(el));
  }

  return template;
}
