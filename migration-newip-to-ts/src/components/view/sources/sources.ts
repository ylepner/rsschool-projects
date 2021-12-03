import './sources.css';
// интерфейс- как выглядит объект
interface News {
  id: string;
  category: string;
  country: string;
  description: string;
  language: string;
  name: string;
  url: string;
}
class Sources {
  draw(data: News[]) {
    console.log(data);
    const fragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp');

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

      sourceClone.querySelector('.source__item-name').textContent = item.name;
      sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document.querySelector('.sources').append(fragment);
  }
}

export default Sources;
