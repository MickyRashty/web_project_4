export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._token = options.token;
  }

  getToken() {
    return this._token;
  }

  async getInitialCards() {
    const response = await fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token
      }
    });

    if (response.ok) {
      return response.json();
    } else {
      console.log("Somthing went wrong", response.status, response.statusText)
    }
  }

  async getUserInfo() {
    const response = await fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token
      }
    });

    if (response.ok) {
      return response.json();
    } else {
      console.log("Somthing went wrong", response.status, response.statusText)
    }
  }

  async editUserInfo(name, about) {
    const response = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    });

    if (response.ok) {
      return response.json();
    } else {
      console.log("Somthing went wrong", response.status, response.statusText)
    }
  }

  async addCard(name, link) {
    const response = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        link,
      })
    });

    if (response.ok) {
      return response.json();
    } else {
      console.log("Somthing went wrong", response.status, response.statusText)
    }
  }

  async deleteCard(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    });

    if (response.ok) {
      return response.ok;
    } else {
      console.log("Somthing went wrong", response.status, response.statusText)
    }
  }

  async editProfileImage(avatar) {
    const response = await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar,
      })
    });

    if (response.ok) {
      return { avatar };
    } else {
      console.log("Somthing went wrong", response.status, response.statusText)
    }
  }
}