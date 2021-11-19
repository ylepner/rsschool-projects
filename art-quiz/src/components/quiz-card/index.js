import html from './index.html'
import './style.css'
import { Component } from '../component'

export class QuizCard extends Component {
  constructor(params) {
    super()
    this.image = params.image
    this.answers = params.answers
    this.timer = params.timer
    this.answerSelected = params.answerSelected
  }

  getTemplate() {
    return html
  }

  renderInternal(element) {
    element.querySelector('.title').innerText = "Who is the author of this picture?"
    element.querySelector('.timer-text').innerText = `00:${this.timer}`
    element.querySelector('img').src = this.image

    this.answers.forEach(answer => {
      let answerLi = document.createElement('li')
      answerLi.innerText = answer
      element.querySelector('ul').appendChild(answerLi)
      answerLi.onclick = () => {
        this.answerSelected(true)
      }
    })
  }

}



