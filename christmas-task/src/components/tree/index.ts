import html from './index.html';
import './style.css';

export function renderTree() {
  const template = document.createElement('div');
  template.innerHTML = html;
  // add tree options
  template.querySelectorAll('.tree').forEach((element: HTMLElement, i: number) => {
    i += 1;
    const treeUrl = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/tree/${i}.png`;
    element.style.backgroundImage = `url(${treeUrl})`;
  });
  // add background options
  template.querySelectorAll('.background').forEach((element: HTMLElement, i: number) => {
    i += 1;
    const backgroundUrl = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/bg/${i}.jpg`;
    element.style.backgroundImage = `url(${backgroundUrl})`;
  });
  // add music
  const audio = template.querySelector('audio');
  const playBtn = template.querySelector('.play-audio') as HTMLElement;
  template.querySelector('.play-audio').addEventListener('click', () => {
    if (playBtn.classList.contains('play')) {
      audioPause();
    } else {
      audioPlay();
    }
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
