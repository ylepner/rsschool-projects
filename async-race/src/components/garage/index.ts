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

  return template;
}
