import { Component } from "../component";
import html from './index.html'

export class Card extends Component {
  constructor() {
    super()
  }
  getTemplate() {
    return html;
  }
}