export default class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _isResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  isRejected(err) {
    console.error(err);
  }

  getIngredients() {
    return fetch(`${this._baseUrl}/ingredients`).then((res) =>
      this._isResponse(res)
    );
  }
}
