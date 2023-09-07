import { Card } from '../../models/models';
import html from './index.html';
import './style.css';

function convertBoolean(data) {
  if (data.favorite === true) {
    return 'Yes';
  }
  return 'No';
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
  template.querySelector('.amount').innerHTML = `Quantity: ${data.count}`;
  template.querySelector('.year').innerHTML = `Year of purchase: ${data.year}`;
  template.querySelector('.shape').innerHTML = `Shape: ${data.shape}`;
  template.querySelector('.color').innerHTML = `Color: ${data.color}`;
  template.querySelector('.size').innerHTML = `Size: ${data.size}`;
  template.querySelector('.is-favorite').innerHTML = `Favorite: ${favorite}`;
  template.children[0].addEventListener('click', () => {
    props.onFavoriteClicked();
  });
  return template.children[0];
}
