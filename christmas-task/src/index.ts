import './style.css';
import data from './data';
import { render } from './components/card/card';

const card = render({} as any)
document.querySelector('.cards').appendChild(card)
