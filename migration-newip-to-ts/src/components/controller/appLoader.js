import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'e672470673734db69c274b93b65715a9',
    });
  }
}

export default AppLoader;
