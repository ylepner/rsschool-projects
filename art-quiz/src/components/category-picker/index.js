import { Card } from '../card'
import { Component } from '../component'
import html from './index.html'
import './style.css'

export class CategoryPicker extends Component {
  constructor(params) {
    super()
    this.homeBtnOnClick = params.homeBtnOnClick
    this.rounds = params.rounds
    this.categoryClick = params.categoryClick
    this.buttonScoreClick = params.buttonScoreClick

  }
  getTemplate() {
    return html
  }
  renderInternal(element) {
    this.cards = this.rounds.map((round, i) => new Card({
      number: i + 1, image: round.imgUrl,
      score: round.score,
      onCardClick: () => {
        this.categoryClick(i)
      },
      onScoreButtonClick: () => {
        this.buttonScoreClick(i)
      }
    }))
    this.cards.forEach((card) => {
      const result = card.render()
      result.classList.add('categories-item')
      element.querySelector('.categories-main-container').appendChild(result)
    })
  }
}
