import html from './index.html'
import './style.css'
import { Component } from '../component'
export default class Settings {
  constructor(params) {

  }
  render() {
    let template = document.createElement('div')
    template.innerHTML = html
    return template
  }
  renderInternal(element) {
    element.querySelector('.save-btn').onclick = () => {
      this.saveSettings()
    }
  }
}


