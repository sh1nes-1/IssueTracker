import { ROOT_URL } from '../config';
import jwt_decode from "jwt-decode";

export class HttpService {
  constructor() {
    this.access_token      = null;
    this.refresh_token     = null;
    this.get               = this.get.bind(this);
    this.post              = this.post.bind(this);
    this.isAuthTokenValid  = this.isAuthTokenValid.bind(this)
    this.setToken          = this.setToken.bind(this)
    this.refreshTokenFunc  = null;
    this.logoutFunc        = null;
  }

  async post(url, data, successCb, errorCb, tryRefreshToken = true, customToken = null) {
    if (tryRefreshToken) {
      await this.tryRefreshToken();
    }

    return fetch(ROOT_URL + url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${customToken ?? this.access_token}`
        },
        body: JSON.stringify(data)
    })
      .then(async (response) => Object.create({
          status: response.status,
          json: await response.json()
        })
      )
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.json);
          return response.json;
        }

        throw response;
      })
      .then(response => successCb ? successCb(response) : Promise.resolve(response))
      .catch(error => {
        console.log(`Got error: ${JSON.stringify(error)}`);

        if (error?.status === 401 && this.logoutFunc) {
          this.logoutFunc();
        }

        return errorCb ? errorCb(error) : Promise.resolve(error)
      });
  }

  async get(url, data, successCb, errorCb, tryRefreshToken = true, customToken = null) {
    if (tryRefreshToken) {
      await this.tryRefreshToken();
    }

    if (data) {
      Object.keys(data).forEach((k) => (data[k] === null || data[k] === undefined) && delete data[k]);
    }

    const queryString = data ? '?' + new URLSearchParams(data).toString() : '';

    return fetch(ROOT_URL+url+queryString, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${customToken ?? this.access_token}`
      }
    })
      .then(async (response) => Object.create({
          status: response.status,
          json: await response.json()
        })
      )
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json;
        }

        throw response;
      })
      .then(response => successCb ? successCb(response) : Promise.resolve(response))
      .catch(error => {
        console.log(`Got error: ${JSON.stringify(error)}`);

        if (error?.status === 401 && this.logoutFunc) {
          this.logoutFunc();
        }

        return errorCb ? errorCb(error) : Promise.resolve(error)
      });
  }

  async delete(url, successCb, errorCb, tryRefreshToken = true, customToken = null) {
    if (tryRefreshToken) {
      await this.tryRefreshToken();
    }

    return fetch(ROOT_URL + url, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${customToken ?? this.access_token}`
        },
    })
      .then(async (response) => Object.create({
          status: response.status,
          json: await response.json()
        })
      )
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.json);
          return response.json;
        }

        throw response;
      })
      .then(response => successCb ? successCb(response) : Promise.resolve(response))
      .catch(error => {
        console.log(`Got error: ${JSON.stringify(error)}`);

        if (error?.status === 401 && this.logoutFunc) {
          this.logoutFunc();
        }

        return errorCb ? errorCb(error) : Promise.resolve(error)
      });
  }

  setToken(access_token) {
    this.access_token = access_token;
  }

  setRefreshToken(refresh_token) {
    this.refresh_token = refresh_token;
  }

  isAuthTokenValid() {
    if (!this.access_token ) {
      console.log('Access token not found!');
      return false;
    }

    const decoded = jwt_decode(this.access_token);
    const currentTime = Math.round(Date.now() / 1000);

    const isTokenValid = decoded.exp > currentTime;
    console.log(`Is token valid: ${isTokenValid}`);
    return isTokenValid;
  }

  async tryRefreshToken() {
    if (this.access_token && this.refreshTokenFunc && !this.isAuthTokenValid()) {
      await this.refreshTokenFunc();
    }
  }
}

const singletonHttpService = new HttpService();
export default singletonHttpService;