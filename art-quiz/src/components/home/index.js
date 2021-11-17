import { Component } from '../component'
import html from './index.html'

export default class Home extends Component {
  constructor(params) {
    super()
    this.categorySelected = params.categorySelected
    this.onSettingsClick = params.onSettingsClick
  }

  getTemplate() {
    return html;
  }

  renderInternal(template) {
    template.querySelector('.artists-block').onclick = () => {
      this.categorySelected('artists')
    }
    template.querySelector('.pictures-block').onclick = () => {
      this.categorySelected('pictures')
    }
    template.querySelector('.settings').onclick = () => {
      this.onSettingsClick()
    }
  }
}


