import { Card } from '../../models/models';
import html from './index.html';

function convertBoolean(data) {
  if (data.favorite === true) {
    return 'Да';
  }
  return 'Нет';
}

export function render(data: Card) {
  const favorite = convertBoolean(data);
  const template = document.createElement('div');
  template.innerHTML = html;
  template.querySelector('.like-btn').id = `${data.num}`;
  template.querySelector('.card-title').innerHTML = `${data.name}`;
  template.querySelector('img').src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/toys/${data.num}.png`;
  template.querySelector('.amount').innerHTML = `Количество: ${data.count}`;
  template.querySelector('.year').innerHTML = `Год покупки: ${data.year}`;
  template.querySelector('.shape').innerHTML = `Форма: ${data.shape}`;
  template.querySelector('.color').innerHTML = `Цвет: ${data.color}`;
  template.querySelector('.size').innerHTML = `Размер: ${data.size}`;
  template.querySelector('.favorite').innerHTML = `Любимая: ${favorite}`;
  return template.children[0];
}
