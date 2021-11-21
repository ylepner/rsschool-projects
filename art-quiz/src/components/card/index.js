import { Component } from "../component";
import html from './index.html'
import './style.css'

export class Card extends Component {
  constructor({ number, image, score, onCardClick }) {
    super()
    this.number = number
    this.image = image
    this.score = score
    this.onCardClick = onCardClick ?? function () {
      console.log('No action')
    }
  }
  getTemplate() {
    return html;
  }
  renderInternal(element) {
    element.querySelector('.title').innerText = this.number
    element.querySelector('button').innerText = this.score
    element.querySelector('img').src = this.image
    element.querySelector('img').onclick = () => {
      this.onCardClick()
    }
  }

}




