import html from './index.html'

export default class Settings {
  constructor(params) {

  }
  render() {
    let template = document.createElement('div')
    template.innerHTML = html
    return template
  }
}
