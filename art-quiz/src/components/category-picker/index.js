import { Card } from '../card'
import { Component } from '../component'
import html from './index.html'

export class CategoryPicker extends Component {
  constructor(params) {
    super()
    this.rounds = [
      {
        score: 9,
        imgUrl: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/0.jpg'
      },
      {
        score: 8,
        imgUrl: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/0.jpg'
      },
    ]
  }
  getTemplate() {
    return html
  }
  renderInternal(element) {
    this.cards = this.rounds.map((round, i) => new Card(i, round.imgUrl, round.score))
    this.cards.forEach((card) => {
      const result = card.render()
      element.appendChild(result)
    })
  }
}
