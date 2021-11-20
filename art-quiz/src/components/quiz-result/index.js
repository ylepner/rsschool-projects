import html from './index.html'
import './style.css'
import { Component } from '../component'

export class QuizResult extends Component {
  constructor(params) {
    super()
    this.quizResult = [{
      picture: {
        author: 'Илья Репин',
        name: 'Проводы новобранца',
        year: '1879',
      },
      isCorrectAnser: true
    }, {
      picture: {
        author: 'Илья Репин',
        name: 'Проводы новобранца',
        year: '1879',
      },
      isCorrectAnser: false
    }]
  }

  getTemplate() {
    return html
  }

  renderInternal(element) {
  }

}



