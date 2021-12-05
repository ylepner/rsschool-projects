import { ArticlesResponse, NewsSourcesResponse } from '../../models/models';
import AppLoader from './appLoader';

class AppController extends AppLoader {

  getSources(callback: (data: NewsSourcesResponse) => void) {
    super.getResp<NewsSourcesResponse>(
      {
        endpoint: 'sources',
      },
      (data) => {
        callback(data)
      }
    );
  }

  getNews(e: Event, callback: (data: ArticlesResponse) => void) {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp<ArticlesResponse>(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            (data) => {
              callback(data)
            }
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}


export default AppController;
