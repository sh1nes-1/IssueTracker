import HttpService from 'services/HttpService';

export function initApp() {
  try {
    let access_token = localStorage.getItem('jwt_access_token');
    HttpService.setToken(access_token);

    let valid = HttpService.isAuthTokenValid();
    console.log("valid - ", valid);
  } catch {
    console.error('Failed to initialize app')
  }
}