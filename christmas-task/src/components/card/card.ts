import html from './index.html';

interface Card {
  num: number;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export function render(data: Card) {
  const template = document.createElement('div');
  template.innerHTML = html;
  return template.children[0];
}
