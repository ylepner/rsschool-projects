import './style.css';
import html from './index.html';

export default function renderGaragePage() {
  const template = document.createElement('div');
  template.innerHTML = html;
  const carIcon = template.querySelector('svg') as SVGSVGElement;
  const startBtn = template.querySelector('.a-btn') as HTMLButtonElement;
  const restartBtn = template.querySelector('.b-btn') as HTMLButtonElement;
  startBtn.addEventListener('click', () => {
    carIcon.classList.add('animate');
    carIcon.onanimationend = () => {
      console.log('Animation ended');
    };
  });
  restartBtn.addEventListener('click', () => {
    carIcon.classList.remove('animate');
  });
  const carSVG = template.querySelector('g');
  carSVG.style.fill = 'orange';

  // fetch('http://localhost:3000/garage', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ name: 'New car 42', color: '#ff00ff00' }),
  // });
  return template;
}
