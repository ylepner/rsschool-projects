export class Component {

  getTemplate() {
    return `<span>No component!</span>`
  }

  renderInternal(element) {
    console.log('No implementation!');
  }

  render() {
    let template = document.createElement('div')
    template.innerHTML = this.getTemplate()
    this.renderInternal(template);
    return template
  }
}