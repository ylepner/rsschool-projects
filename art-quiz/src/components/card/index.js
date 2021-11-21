import { Component } from "../component";
import html from './index.html'
import './style.css'

export class Card extends Component {
  constructor({ number, image, score, onCardClick }) {
    super()
    this.number = number
    this.image = image
    this.score = score
    this.buttonToScore = buttonToScore
    this.onCardClick = onCardClick ?? function () {
      console.log('No action')
    }
  }
  getTemplate() {
    return html;
  }
  renderInternal(element) {
    element.querySelector('.title').innerText = this.number
    element.querySelector('.score').innerText = this.score
    element.querySelector('img').src = this.image
    element.querySelector('.card').onclick = () => {
      this.onCardClick()
    }
  }

}




