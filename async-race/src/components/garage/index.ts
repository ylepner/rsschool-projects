import './style.css';
import html from './index.html';
import renderCar from '../car/car';
import { Car } from '../../models/models';

export default function renderGaragePage() {
  const template = document.createElement('div');
  template.innerHTML = html;

  // fetch('http://localhost:3000/garage', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ name: 'New car 42', color: '#ff00ff00' }),
  // });

  async function getAndSetCars() {
    const url = 'http://localhost:3000/garage';
    const result = await fetch(url);
    const data = await result.json();
    data.forEach((el: Car) => {
      template.querySelector('.garage').appendChild(renderCar(el));
    });
    return data;
  }

  getAndSetCars();

  // const colorSelector = template.querySelector('.color-update') as HTMLInputElement;
  // colorSelector.addEventListener('change', () => {
  //   carSVG.style.fill = colorSelector.value;
  // });

  const inputCreateCar = template.querySelector('.create-input') as HTMLInputElement;
  inputCreateCar.addEventListener('change', () => {
    const newCarName = inputCreateCar.value;
  });

  const createBtn = template.querySelector('.create-btn') as HTMLButtonElement;
  createBtn.addEventListener('click', () => {
    addCarToServer();
  })

  function addCarToServer() {

  }

  return template;
}
