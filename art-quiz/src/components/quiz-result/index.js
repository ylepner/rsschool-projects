import html from './index.html'
import htmlIcon from './quiz-result-icon.html'
import './style.css'
import { Component } from '../component'

export class QuizResult extends Component {
  constructor(params) {
    super()
    console.log(params)
    this.quizResult = params.quizResult.results
  }

  getTemplate() {
    return html
  }

  renderInternal(element) {
    this.quizResult.forEach((result) => {
      const tempNode = document.createElement('div')
      tempNode.innerHTML = htmlIcon
      const iconDiv = tempNode.firstElementChild
      element.querySelector('.quiz-result').appendChild(iconDiv)
      iconDiv.querySelector('img').src = result.picture.imgURL
      if (result.isCorrectAnswer) {
        iconDiv.classList.add('correct-card')
      } else {
        iconDiv.classList.add('incorrect-card')
      }
    })
  }
}




