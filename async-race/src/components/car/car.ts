import './style.css';
import html from './index.html';
import { Car } from '../../models/models';
import { updateCar } from '../../garage-api';

export interface CarComponentParams {
  car: Car;
  onSelect?: () => void;
  onRemove?: () => void;
}
export default function renderCar(params: CarComponentParams) {
  const { car } = params;
  const template = document.createElement('div');
  template.innerHTML = html;
  const carIcon = template.querySelector('svg') as SVGSVGElement;
  const startBtn = template.querySelector('.a-btn') as HTMLButtonElement;
  const restartBtn = template.querySelector('.b-btn') as HTMLButtonElement;
  startBtn.addEventListener('click', () => {
    carIcon.classList.add('animate');
    carIcon.onanimationend = () => {
      carIcon.classList.add('stop-car');
    };
  });
  restartBtn.addEventListener('click', () => {
    carIcon.classList.remove('stop-car');
    carIcon.classList.remove('animate');
  });
  const carName = template.querySelector('.car-name') as HTMLElement;
  carName.innerHTML = car.name;
  const carSVG = template.querySelector('g');
  carSVG.style.fill = car.color;
  const removeBtn = template.querySelector('.remove-btn') as HTMLButtonElement;
  removeBtn.addEventListener('click', () => {
    params?.onRemove();
  });
  const selectBtn = template.querySelector('.select-btn') as HTMLButtonElement;
  selectBtn.addEventListener('click', () => {
    params?.onSelect();
    // template.querySelector('.update').classList.remove('.not-clickable');
  });
  return template;
}
