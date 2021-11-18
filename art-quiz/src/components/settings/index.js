import html from './index.html'
import './style.css'
import { Component } from '../component'
export default class Settings extends Component {
  constructor(params) {
    super()
    this.onSaveSettings = params.onSaveSettings
  }
  getTemplate() {
    return html
  }

  renderInternal(element) {
    element.querySelector('.save-btn').onclick = () => {
      this.onSaveSettings()
    }
  }
}


