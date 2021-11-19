import { Card } from '../card'
import { Component } from '../component'
import html from './index.html'
import './style.css'

export class CategoryPicker extends Component {
  constructor(params) {
    super()
    this.homeBtnOnClick = params.homeBtnOnClick
    this.rounds = []
    this.categoryClick = params.categoryClick
    const round = {
      score: 9,
      imgUrl: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/0.jpg'
    }
    for (let i = 0; i < 12; i++) {
      this.rounds.push(round)
    }

  }
  getTemplate() {
    return html
  }
  renderInternal(element) {
    this.cards = this.rounds.map((round, i) => new Card({
      number: i + 1, image: round.imgUrl, score: round.score, onCardClick: () => {
        this.categoryClick(i)
      }
    }))
    this.cards.forEach((card) => {
      const result = card.render()
      result.classList.add('categories-item')
      element.querySelector('.categories-main-container').appendChild(result)
    })
    element.querySelector('.home-btn').onclick = () => {
      this.homeBtnOnClick()
    }
  }
}
