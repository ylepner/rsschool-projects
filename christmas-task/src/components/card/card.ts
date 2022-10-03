import { Card } from '../../models/models';
import html from './index.html';
import './style.css';

function convertBoolean(data) {
  if (data.favorite === true) {
    return 'Да';
  }
  return 'Нет';
}

interface CardComponentProps {
  card: Card;
  onFavoriteClicked: () => void;
}

export function render(props: CardComponentProps) {
  const template = document.createElement('div');
  const data = props.card;
  const favorite = convertBoolean(data);
  template.innerHTML = html;
  template.querySelector('.like-btn').id = `${data.num}`;
  template.querySelector('.card-title').innerHTML = `${data.name}`;
  template.querySelector('img').src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/toys/${data.num}.png`;
  template.querySelector('.amount').innerHTML = `Количество: ${data.count}`;
  template.querySelector('.year').innerHTML = `Год покупки: ${data.year}`;
  template.querySelector('.shape').innerHTML = `Форма: ${data.shape}`;
  template.querySelector('.color').innerHTML = `Цвет: ${data.color}`;
  template.querySelector('.size').innerHTML = `Размер: ${data.size}`;
  template.querySelector('.is-favorite').innerHTML = `Любимая: ${favorite}`;
  template.children[0].addEventListener('click', () => {
    props.onFavoriteClicked();
  });
  return template.children[0];
}
