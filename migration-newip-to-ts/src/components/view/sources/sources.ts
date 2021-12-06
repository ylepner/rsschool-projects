import './sources.css';
import { NewsSources } from '../../../models/models';

type GroupSources = { [key: string]: Array<NewsSources> };
class Sources {
  draw(data: Array<NewsSources>) {
    const languageSources: GroupSources = {}
    data.forEach((element) => {
      if (!languageSources[element.language]) {
        languageSources[element.language] = []
      }
      languageSources[element.language].push(element)
    })
    const fragment = document.createDocumentFragment();
    const languageItemTemp: HTMLTemplateElement = document.querySelector('#languageItemTemp');
    const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp');

    // вернет массив с ключами объекта 
    // const languagesList = Object.keys(languageSources) as string[]
    const languageListObj = {
      "en": "English",
      "no": "Norwegian",
      "it": "Italian",
      "ar": "Arabic",
      "de": "German",
      "pt": "Portuguese",
      "es": "Spanish",
      "fr": "French",

      "he": "Hebrew",
      "ru": "Russian",
      "se": "Swedish",
      "nl": "Dutch",
      "zh": "Chinese",
    }
    const languagesList = Object.entries(languageListObj)

    languagesList.forEach((item, i) => {
      const languageClone = languageItemTemp.content.cloneNode(true) as HTMLElement;

      languageClone.querySelector('.language__item-name').textContent = item[1];
      languageClone.querySelector('.language__item').setAttribute('data-language-id', item[0]);
      languageClone.querySelector('.language__item').classList.add('language-btn');
      fragment.append(languageClone);
    });
    console.log('Lang list', languagesList);
    document.querySelector('.languages').append(fragment);

    const languageButton = document.querySelectorAll('.language-btn') as any
    console.log(languageButton)
    for (let i = 0; i < languageButton.length; i++) {
      languageButton[i].addEventListener('click', function () {
        addSources(languageButton[i].dataset.languageId)
      });
    }

    // добавить ресурсы
    function addSources(lang: any) {
      document.querySelector('.sources').innerHTML = '';
      languageSources[lang].forEach((item) => {
        const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
        sourceClone.querySelector('.source__item-name').textContent = item.name;
        sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

        fragment.append(sourceClone);
      });

      document.querySelector('.sources').append(fragment);
    }

  }
}


export default Sources;