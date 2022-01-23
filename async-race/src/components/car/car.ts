import './style.css';
import html from './index.html';
import { Car, RideParams } from '../../models/models';
import { startDrive, startEngine, updateCar } from '../../garage-api';

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
  startBtn.addEventListener('click', async () => {
    // startDriveCar();
    const driveFn = await rideCar();
    driveFn();
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

  async function rideCar() {
    const rideParams = await startEngine(car.id);
    return async () => {
      const time = startDriveCar(rideParams);
      const now = performance.now();
      const rideResult = await startDrive(car.id);
      if (!rideResult) {
        const end = performance.now();
        const diffSec = (end - now) / 1000;
        const timePercents = (diffSec * 100) / time;
        carWrapper.style.transform = `translateX(${timePercents}%)`;
        carWrapper.classList.remove('stop-car');
      }
      return {
        time,
        rideResult,
        car,
      };
    };
  }

  function startDriveCar(rideParams: RideParams) {
    const time = rideParams.distance / rideParams.velocity / 1000;
    carWrapper.style.transitionDuration = `${time}s`;
    carWrapper.classList.add('stop-car');
    startBtn.classList.add('not-clickable');
    restartBtn.classList.remove('not-clickable');
    return time;
  }
  function restart() {
    carWrapper.style.removeProperty('transform');
    carWrapper.style.removeProperty('transition-duration');
    startBtn.classList.remove('not-clickable');
    restartBtn.classList.add('not-clickable');
    carWrapper.classList.remove('stop-car');
  }
  return {
    template,
    restart,
    rideCar,
  };
}
