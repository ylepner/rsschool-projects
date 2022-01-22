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
  // const carIcon = template.querySelector('svg') as SVGSVGElement;
  const carWrapper = template.querySelector('.car-wrapper') as HTMLDivElement;
  const startBtn = template.querySelector('.a-btn') as HTMLButtonElement;
  const restartBtn = template.querySelector('.b-btn') as HTMLButtonElement;
  startBtn.addEventListener('click', () => {
    startDriveCar();
  });
  restartBtn.addEventListener('click', () => {
    restart();
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
  });
  function startDriveCar() {
    carWrapper.classList.add('stop-car');
    startBtn.classList.add('not-clickable');
    restartBtn.classList.remove('not-clickable');
    carWrapper.onanimationend = () => {
      carWrapper.classList.add('stop-car');
    };
  }
  function restart() {
    startBtn.classList.remove('not-clickable');
    restartBtn.classList.add('not-clickable');
    carWrapper.classList.remove('stop-car');
    carWrapper.classList.remove('animate');
  }
  return {
    template,
    startDriveCar,
    restart,
  };
}
