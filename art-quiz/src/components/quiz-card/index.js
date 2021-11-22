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
    this.correctAnswer = params.correctAnswer
  }

  getTemplate() {
    return html
  }

  renderInternal(element) {
    this.element = element
    element.querySelector('.title').innerText = "Who is the author of this picture?"
    element.querySelector('.timer-text').innerText = `00:${this.timer}`
    element.querySelector('img').src = this.image
    element.querySelector('.result-info-img').src = this.image


    this.answerLis = this.answers.map(answer => {
      let answerLi = document.createElement('li')
      answerLi.innerText = answer
      return answerLi
    })

    this.answerLis.forEach((answerLi, i) => {
      element.querySelector('ul').appendChild(answerLi)
      answerLi.onclick = () => {
        if (this.isSelected) {
          return
        }
        this.isSelected = true
        answerLi.classList.add('selected-answer')
        this.selectAnswerOrTimeIsOver(i === this.correctAnswer)
        console.log(this.correctAnswer, i)
      }
    })
  }


  selectAnswerOrTimeIsOver(isCorrectAnswer) {
    const audioDone = this.element.querySelector('.wrong-sound')
    const audioWrong = this.element.querySelector('.done-sound')
    if (isCorrectAnswer) {
      audioDone.play()
      this.element.querySelector('.window-result-container').style.color = "#598c59"
      this.element.querySelector('.symbol-answer').innerText = '✔️'
    } else {
      audioWrong.play()
      this.element.querySelector('.symbol-answer').innerText = '❌'
    }
    this.isSelected = true
    this.answerLis[this.correctAnswer].classList.add('correct-answer')
    setTimeout(this.showPisctureInfo(), 20000)
    this.element.querySelector('.next-btn').onclick = () => {
      this.answerSelected(isCorrectAnswer)
    }
    clearInterval(this.intervalId)

  }

  showPisctureInfo() {
    this.element.querySelector('.symbol-answer')
    this.element.querySelector('.window-result-container').classList.add('visible')
  }

  startCountdown() {
    if (this.timer) {
      this.intervalId = setInterval(() => {
        this.timer--
        if (this.timer <= 0) {
          this.selectAnswerOrTimeIsOver(false)
        }
        this.element.querySelector('.timer-text').innerText = `00:0${this.timer}`
      }, 1000)
    }
  }

}



