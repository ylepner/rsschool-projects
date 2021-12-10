export class Component {
  getTemplate() {
    return '<span>No component!</span>';
  }

  renderInternal() {
    return 'No implementation!';
  }

  render() {
    const template = document.createElement('div');
    template.innerHTML = this.getTemplate();
    this.renderInternal(template);
    return template;
  }
}
