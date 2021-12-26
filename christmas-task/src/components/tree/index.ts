import html from './index.html';
import './style.css';

export function renderTree(cart: ToysCart) {
  const toysCart = new ToysCartData(cart);
  const template = document.createElement('div');
  template.innerHTML = html;
  const treeBox = template.querySelector('.tree-box') as HTMLElement;
  const treeImg = template.querySelector('.tree-box-img') as HTMLImageElement;
  const audio = template.querySelector('audio');
  const playBtn = template.querySelector('.play-audio') as HTMLElement;
  const snowFalling = template.querySelector('.falling-snow') as HTMLElement;
  const toyCartDiv = template.querySelector('.toys-cart') as HTMLElement;

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

  // drag and drop

  const area = template.querySelector('area') as HTMLElement;
  const cartUpdate = () => {
    updateToysCart(cart, toyCartDiv);
    template.querySelectorAll('.toy').forEach((element: HTMLImageElement) => {
      const toyId = element.dataset.toyid;
      if (toysCart.hasToy(toyId)) {
        element.addEventListener('dragend', (event) => {
          if (isDroppedWithinTree(event)) {
            const copyImg = document.createElement('img');
            copyImg.addEventListener('dragend', (ev) => {
              if (isDroppedWithinTree(ev)) {
                addCoordinates(ev, copyImg);
                area.append(copyImg);
              } else {
                copyImg.remove();
                toysCart.returnToy(toyId);
                cartUpdate();
              }
            });
            copyImg.src = element.src;
            copyImg.style.width = '40px';
            addCoordinates(event, copyImg);
            copyImg.classList.add('toy-on-tree');
            area.append(copyImg);
            toysCart.pullToy(toyId);
            cartUpdate();
          }
          event.preventDefault();
        });
      }
    });
  };

  cartUpdate();

  area.addEventListener('dragover', (event) => {
    event.preventDefault();
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

  function addCoordinates(ev: DragEvent, element: HTMLElement) {
    const rect = area.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    element.style.top = `${y}px`;
    element.style.left = `${x}px`;
  }
}

function isDroppedWithinTree(dragEvent: DragEvent) {
  return dragEvent.dataTransfer.dropEffect === 'copy';
}

export type ToysCart = { toyId: string, amount: number }[];

function updateToysCart(cart: ToysCart, parentDiv: HTMLElement) {
  parentDiv.innerHTML = '';
  const divs = cart.map((element) => {
    const htmlDiv = `
    <div class="toy-item back-img">
      <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/toys/${element.toyId}.png" alt="" class="toy" draggable="true" style="width: 40px" data-toyId=${element.toyId}>
      <div class="amount-of-item">${element.amount}</div>
    </div>`;
    return htmlDiv;
  });

  parentDiv.innerHTML = divs.join('');
}

class ToysCartData {
  constructor(private toysCart: ToysCart) {
  }

  hasToy(toyId: string) {
    return this.getToyItem(toyId).amount > 0;
  }

  pullToy(toyId: string) {
    this.getToyItem(toyId).amount--;
  }

  returnToy(toyId: string) {
    this.getToyItem(toyId).amount++;
  }

  private getToyItem(toyId: string) {
    return this.toysCart.find(c => c.toyId === toyId);
  }
}
