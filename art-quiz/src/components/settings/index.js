import html from './index.html'
import './style.css'
import { Component } from '../component'
export default class Settings extends Component {
  constructor(params) {
    super()
    this.onSaveSettings = params.onSaveSettings
    this.timerInputValue = params.timerInputValue
  }
  getTemplate() {
    return html
  }



  renderInternal(element) {
    element.querySelector('.save-btn').onclick = () => {
      this.onSaveSettings()
    }
    element.querySelector('.timer-input').addEventListener('input', function () {
      const value = this.value
      element.querySelector('.timer-control-text').innerText = value
    })
    element.querySelector('.timer-checked').addEventListener('change', function () {
      if (!this.checked) {
        element.querySelector('.timer-control-text').value = 0
        element.querySelector('.timer-input').disabled = true
        element.querySelector('.timer-input').classList.add('disabled')
      } else {
        element.querySelector('.timer-input').disabled = false
        element.querySelector('.timer-input').classList.remove('disabled')
      }
    })
  }
}


