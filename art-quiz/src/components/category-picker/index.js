import html from './index.html'

export default class CategoryPicker {
  constructor(params) {

  }
  render() {
    let template = document.createElement('div')
    template.innerHTML = html

    return template
  }
}


