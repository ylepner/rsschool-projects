// eslint-disable-next-line prettier/prettier
export class Component {
  getTemplate() {
    return `<span>No component!</span>`;
  }

  renderInternal(element) {
    console.log('No implementation!');
  }

  render() {
    const template = document.createElement('div');
    template.innerHTML = this.getTemplate();
    this.renderInternal(template);
    return template;
  }
}
