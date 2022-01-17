import './style.css';
import html from './index.html';

export default function renderGaragePage() {
  const template = document.createElement('div');
  template.innerHTML = html;
  return template;
}
