import './style.css';
import html from './index.html';

export default function renderGaragePage() {
  const template = document.createElement('div');
  template.innerHTML = html;
  const carImg = template.querySelector('.car-img') as HTMLImageElement;
  const startBtn = template.querySelector('.a-btn') as HTMLButtonElement;
  const restartBtn = template.querySelector('.b-btn') as HTMLButtonElement;
  startBtn.addEventListener('click', () => {
    carImg.classList.add('animate');
  });
  restartBtn.addEventListener('click', () => {
    carImg.classList.remove('animate');
  });
  return template;
}
