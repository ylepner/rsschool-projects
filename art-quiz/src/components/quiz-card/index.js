import html from './index.html'
import './style.css'
import { Component } from '../component'

export class QuizCard extends Component {
  constructor(params) {
    super()
    this.image = params.image
    this.answers = params.answers
    this.timer = params.timer
    this.volume = params.volume
    this.answerSelected = params.answerSelected
    this.correctAnswer = params.correctAnswer
    this.picture = params.picture
  }

  getTemplate() {
    return html
  }

  renderInternal(element) {
    this.element = element
    if (!this.timer) {
      element.querySelector('.timer-text').style.display = 'none'
    }
    this.element.querySelector('.wrong-sound').volume = this.volume * 0.01
    this.element.querySelector('.done-sound').volume = this.volume * 0.01
    element.querySelector('.title').innerText = "Who is the author of this picture?"
    element.querySelector('.timer-text').innerText = getTimerText(this.timer)
    element.querySelector('img').src = this.image
    element.querySelector('.result-info-img').src = this.image
    element.querySelector('.picture-title').innerText = this.picture.name
    element.querySelector('.artist-title').innerText = this.picture.author
    element.querySelector('.year-of-picture').innerText = this.picture.year

    // element.querySelector('.marks').appendChild('')
    // <div class="mark empty"></div>


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
      }
    })
  }


  selectAnswerOrTimeIsOver(isCorrectAnswer) {
    const audioDone = this.element.querySelector('.wrong-sound')
    const audioWrong = this.element.querySelector('.done-sound')
    // const audioClock = this.element.querySelector('.clock')
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
    setTimeout(() => {
      this.showPisctureInfo()
    }, 500)
    this.element.querySelector('.next-btn').onclick = () => {
      this.answerSelected(isCorrectAnswer)
    }
    clearInterval(this.intervalId)
    // audioClock.pause()

  }

  showPisctureInfo() {
    this.element.querySelector('.symbol-answer')
    this.element.querySelector('.window-result-container').classList.add('visible')
  }

  startCountdown() {
    if (this.timer) {
      // this.element.querySelector('.clock').play()
      this.intervalId = setInterval(() => {
        this.timer--
        if (this.timer <= 0) {
          this.selectAnswerOrTimeIsOver(false)
        }
        this.element.querySelector('.timer-text').innerText = getTimerText(this.timer)
      }, 1000)
    }
  }

}

function getTimerText(time) {
  if (time > 9) {
    return `00:${time}`
  }
  return `00:0${time}`
}



