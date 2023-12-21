class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  async _fetch(url, options) {
    try {
      const response = await fetch(`${this._baseUrl}${url}`, {
        headers: {
          Authorization: this._headers.authorization,
          "Content-Type": "application/json",
        },
        ...options,
      });
      if (!response.ok) {
        Promise.reject(`API error: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Fetch to ${url} failed: ${error.message}`);
    }
  }
  getInfoServer(url) {
    return this._fetch(url, { headers: this._headers });
  }
  updateUserProfile(url, body) {
    return this._fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: body,
    });
  }
  postCreateCards(url, body) {
    return this._fetch(url, {
      method: "POST",
      headers: this._headers,
      body: body,
    });
  }
  putLikesCard(url) {
    return this._fetch(url, {
      method: "PUT",
      headers: this._headers,
    });
  }
  deleteInfoServer(url) {
    return this._fetch(url, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

const api = new Api({
  baseUrl: `https://around.nomoreparties.co/v1//web_es_05/`,
  headers: {
    authorization: "a1e6aa2e-20ff-4c9e-8a8e-2b23e3b6a743",
    "Content-Type": "application/json",
  },
});

export default api;
