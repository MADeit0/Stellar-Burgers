import { baseUrl } from "./constants";

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  handleError(err) {
    console.error(err);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getIngredients() {
    return this._request(`${this._baseUrl}/ingredients`, null);
  }

  sendIngredients(ingredientsId) {
    return this._request(`${this._baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsId
      }),
    });
  }
}

const api = new Api(baseUrl);
export default api;
