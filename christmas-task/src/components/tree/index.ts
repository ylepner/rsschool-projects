import html from './index.html';
import './style.css';

export function renderTree() {
  const template = document.createElement('div');
  template.innerHTML = html;
  const treeBox = template.querySelector('.tree-box') as HTMLElement;
  const treeImg = template.querySelector('.tree-box-img') as HTMLImageElement;
  const audio = template.querySelector('audio');
  const playBtn = template.querySelector('.play-audio') as HTMLElement;
  const snowFalling = template.querySelector('.falling-snow') as HTMLElement;
  // add tree options
  template.querySelectorAll('.tree').forEach((element: HTMLElement, i: number) => {
    const treeUrl = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/tree/${i + 1}.png`;
    element.style.backgroundImage = `url(${treeUrl})`;
    element.addEventListener('click', () => {
      treeImg.src = treeUrl;
    });
  });
  // add background options
  template.querySelectorAll('.background').forEach((element: HTMLElement, i: number) => {
    const backgroundUrl = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/bg/${i + 1}.jpg`;
    element.style.backgroundImage = `url(${backgroundUrl})`;
    element.addEventListener('click', () => {
      treeBox.style.backgroundImage = `url(${backgroundUrl})`;
    });
  });
  // add music
  template.querySelector('.play-audio').addEventListener('click', () => {
    if (playBtn.classList.contains('play')) {
      audioPause();
    } else {
      audioPlay();
    }
  });
  // add snow
  template.querySelector('.snow').addEventListener('click', () => {
    template.querySelector('.snow').classList.toggle('active-snow-btn');
    snowFalling.classList.toggle('fall');
  });
  // add lights
  template.querySelectorAll('ul').forEach((element: HTMLElement) => {
    for (let i = 0; i < 38; i++) {
      const li = document.createElement('li');
      element.appendChild(li);
    }
  });
  // lights switch
  template.querySelectorAll('.lights-btn').forEach((element: HTMLElement) => {
    element.addEventListener('click', () => {
      if (element.dataset.color === 'no-color') {
        template.querySelector('.tree-lights').classList.add('invisible');
      } else {
        template.querySelector('.tree-lights').classList.remove('invisible');
        element.classList.toggle('active');
        if (element.classList.contains('active')) {
          template.querySelectorAll('li').forEach((el) => {
            el.className = '';
            el.classList.add(element.dataset.color);
          });
        }
      }
    });
  });

  return template;

  function audioPlay() {
    playBtn.classList.remove('pause');
    playBtn.classList.add('play');
    audio.play();
  }

  function audioPause() {
    playBtn.classList.remove('play');
    playBtn.classList.add('pause');
    audio.pause();
  }
}
