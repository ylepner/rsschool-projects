import { Component } from "../component";
import html from './index.html'

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
}