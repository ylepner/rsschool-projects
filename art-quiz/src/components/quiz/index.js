import html from './index.html'
import './style.css'
import { Component } from '../component'
import { QuizCard } from '../quiz-card'

export class Quiz extends Component {
  constructor(params) {
    super()
    this.questions = params.questions
  }

  getTemplate() {
    return html
  }
  renderInternal(element) {
    this.cards = this.questions.map((question, i) => new QuizCard({

    }))
    this.cards.forEach((card) => {
      const result = card.render()
      // result.classList.add('')
      element.querySelector('.quiz-container').appendChild(result)
    })
  }
}

