import { Component } from "../component";
import html from './index.html'
import './style.css'

export class Card extends Component {
  constructor(number, image, score) {
    super()
    this.number = number
    this.image = image
    this.score = score
  }
  getTemplate() {
    return html;
  }
  renderInternal(element) {
    element.querySelector('.title').innerText = this.number
    element.querySelector('.score').innerText = this.score
    element.querySelector('img').src = this.image


  }
}