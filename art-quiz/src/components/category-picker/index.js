import { Component } from '../component'
import html from './index.html'

export class CategoryPicker extends Component {
  constructor(params) {
    super()
    this.categories = [
      {
        score: 8,
        imgUrl: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/0.jpg'
      }
    ]
  }
  getTemplate() {
    return html
  }
  renderInternal(element) {

  }
}


