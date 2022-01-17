import './style.css';
import html from './index.html';

export default function renderWinnersPage() {
  const template = document.createElement('div');
  template.innerHTML = html;
  return template;
}
