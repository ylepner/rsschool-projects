import html from './index.html';
import './style.css';

export function renderHome() {
  const template = document.createElement('div');
  template.innerHTML = html;
  return template;
}
