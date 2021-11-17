import html from './index.html'
import './style.css'

export default class Settings {
  constructor(params) {

  }
  render() {
    let template = document.createElement('div')
    template.innerHTML = html
    return template
  }
}
