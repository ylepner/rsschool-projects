// интерфейс- как выглядит объект
export interface NewsSources {
  id: string;
  category: string;
  country: string;
  description: string;
  language: string;
  name: string;
  url: string;
}

export interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string, name: string };
  title: string;
  url: string;
  urlToImage: string;
}

export interface ArticlesResponse {
  articles: Array<Article>;
  status: string;
  totalResult: number;
}

export interface NewsSourcesResponse {
  sources: Array<NewsSources>;
  status: string;
}

// enum Lang {
//   RU = 'ru',
//   EN = 'en',
// }

// function  lang(params:Lang) {
//   if(params === Lang.RU) {

//   }
// }