import './sources.css';
import { NewsSources } from '../../../models/models';

type GroupSources = { [key: string]: Array<NewsSources> };
class Sources {
  draw(data: Array<NewsSources>) {
    console.log(data)
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
    const languagesList = Object.keys(languageSources) as string[]
    const languageListMap = languagesList.map((lang) => {
      if (lang === 'en') {
        return lang = 'English'
      }
      if (lang === "no") {
        return lang = "Norwegian"
      }
      if (lang === "it") {
        return lang = "Italian"
      }
      if (lang === "ar") {
        return lang = "Arabic"
      }
      if (lang === "ud") {
        return lang = "-"
      }
      if (lang === "de") {
        return lang = "German"
      }
      if (lang === "pt") {
        return lang = "Portuguese"
      }
      if (lang === "es") {
        return lang = "Spanish"
      }
      if (lang === "fr") {
        return lang = "French"
      }
      if (lang === "he") {
        return lang = "Hebrew"
      }
      if (lang === "ru") {
        return lang = "Russian"
      }
      if (lang === "se") {
        return lang = "Swedish"
      }
      if (lang === "nl") {
        return lang = "Dutch"
      }
      if (lang === "zh") {
        return lang = "Chinese"
      }
    })

    // добавить языки

    languagesList.forEach((item: string) => {
      const languageClone = languageItemTemp.content.cloneNode(true) as HTMLElement;

      languageClone.querySelector('.language__item-name').textContent = item;
      languageClone.querySelector('.language__item').setAttribute('data-language-id', item);
      languageClone.querySelector('.language__item').classList.add('language-btn');
      fragment.append(languageClone);
    });

    document.querySelector('.languages').append(fragment);

    const languageButton = document.querySelectorAll('.language-btn') as any
    for (let i = 0; i < languageButton.length; i++) {
      languageButton[i].addEventListener('click', function () {
        addSources(languageButton[i].outerText)
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