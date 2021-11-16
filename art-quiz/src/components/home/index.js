//import html from './index.html'

const html = `<div class="pictures-quiz-container">
<div class="artists-block img-main">
  <img src="./assets/img/figma/artists-quiz.jpg" alt="">
</div>
<div class="pictures-block img-main">
  <img src="./assets/img/figma/pictures quiz.jpg" alt="">
</div>
</div>
<div class="settings">
<button type="button">
  <img src="./assets/img/figma/settings-button.jpg" alt="">
</button>
</div>`
export default class Home {
  render() {
    let template = document.createElement('div')
    template.innerHTML = html
    return template
  }
}

