import html from './index.html'

export default class Home {
  render() {
    let template = document.createElement('div')
    template.innerHTML = html
    return template
  }
}

