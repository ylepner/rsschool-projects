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
      // this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #710707 ${value}%, #d3d3d3 100%)`
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
    const audio = element.querySelector('audio')
    const volumeInput = element.querySelector('.volume-input')
    element.querySelector('.volume-checked').addEventListener('change', function () {
      if (this.checked) {
        audio.play()
        volumeInput.disabled = false
        volumeInput.classList.remove('disabled')
      } else {
        audio.pause()
        volumeInput.disabled = true
        volumeInput.classList.add('disabled')
      }
    })
    volumeInput.addEventListener('input', function () {
      const value = this.value
      // this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #710707 ${value}%, #d3d3d3 100%)`
      audio.volume = value / 100
      if (audio.volume > 0) {
        audio.muted = false
      } else {
        audio.muted = true
      }
    })
  }
}


