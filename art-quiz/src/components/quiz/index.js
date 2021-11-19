import html from './index.html'
import './style.css'
import { Component } from '../component'
import { QuizCard } from '../quiz-card'

export class Quiz extends Component {
  constructor(params) {
    super()
    this.questions = params.questions
    this._activeCard = 0
  }

  getTemplate() {
    return html
  }
  renderInternal(element) {
    console.log(this.questions)
    this.cards = this.questions.map((question, i) => new QuizCard({
      image: question.image,
      answers: question.answers,
      timer: 10,
      answerSelected: (isCorrect) => {
        this.activeCard = this.activeCard + 1

      }


    }));
    this.cardElements = this.cards.map(card => card.render())
    this.cardElements.forEach((result) => {
      // result.classList.add('')
      element.querySelector('.quiz-container').appendChild(result)
    })
    this.updateActiveCard()
  }
  updateActiveCard() {
    this.cardElements.forEach((element, i) => {
      if (i === this.activeCard) {
        element.classList.add('active')
        element.classList.remove('non-active')
      } else {
        element.classList.remove('active')
        element.classList.add('non-active')
      }

    })

  }


  get activeCard() {
    return this._activeCard;
  }

  set activeCard(value) {
    this._activeCard = value
    this.updateActiveCard()
  }
}

