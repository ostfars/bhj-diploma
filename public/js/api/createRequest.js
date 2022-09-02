/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();

  let url = options.url;
  const formData = new FormData();

  if (options.data) {
    if (options.method === "GET") {
      url += '?' + Object.entries(options.data).map(
        ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
    }
  }

  xhr.open(options.method, url);
  xhr.send();
};
