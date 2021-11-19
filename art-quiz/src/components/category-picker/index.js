import { Card } from '../card'
import { Component } from '../component'
import html from './index.html'
import './style.css'

export class CategoryPicker extends Component {
  constructor(params) {
    super()
    // this.rounds = [
    //   {
    //     score: 9,
    //     imgUrl: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/0.jpg'
    //   },
    //   {
    //     score: 8,
    //     imgUrl: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/0.jpg'
    //   },
    // ]
    this.rounds = []
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
    this.cards = this.rounds.map((round, i) => new Card(i, round.imgUrl, round.score))
    this.cards.forEach((card) => {
      const result = card.render()
      result.classList.add('categories-item')
      element.querySelector('.categories-main-container').appendChild(result)
    })
  }
}
