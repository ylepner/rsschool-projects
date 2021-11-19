import html from './index.html'
import './style.css'
import { Component } from '../component'
import { QuizCard } from '../quiz'

export class Quiz extends Component {
  constructor(params) {
    super()
  }

  getTemplate() {
    return html
  }
  renderInternal(element) {
  }
}
