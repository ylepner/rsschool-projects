import html from './index.html'
import './style.css'
import { Component } from '../component'

export default class QuizCard extends Component {
  constructor(params) {
    super()
    this.image = params.image
    this.answers = params.answers
    this.timer = params.timer
  }

  getTemplate() {
    return html
  }


}



