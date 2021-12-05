type Options = { [key: string]: string | number };

class Loader {
  // private baseLink: string;
  // private options: any;
  constructor(private baseLink: string, private options: Options) {
    // this.baseLink = baseLink;
    // this.options = options;
  }

  getResp(
    // первый аргумент
    { endpoint, options = {} },
    // второй аругмент со значением по умолчанию
    callback: (data: any) => void = () => {
      console.error('No callback for GET response');
    },
  ) {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: object, endpoint: string) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint: string, callback: (data: object) => void, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;

// const dic = {
//   foo: 1,
//   bar: 2
// }

// 'news.com/news?foo=1&bar=2'