import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '233320c3d5b94c719b96e0fef48eee07',
    });
  }
}

export default AppLoader;
