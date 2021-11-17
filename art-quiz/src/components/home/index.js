import html from './index.html'

export default class Home {
  constructor(params) {
    this.categorySelected = params.categorySelected
    this.onSettingsClick = params.onSettingsClick
  }
  render() {
    let template = document.createElement('div')
    template.innerHTML = html
    template.querySelector('.artists-block').onclick = () => {
      this.categorySelected('artists')
    }
    template.querySelector('.pictures-block').onclick = () => {
      this.categorySelected('pictures')
    }
    template.querySelector('.settings').onclick = () => {
      this.onSettingsClick()
    }

    return template
  }
}

