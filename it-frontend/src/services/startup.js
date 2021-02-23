import HttpService from 'services/HttpService';
import history from '../history';

let refreshTokenPromise = null;

function logout() {
  HttpService.setToken(null);
  localStorage.removeItem('jwt_access_token');
  localStorage.removeItem('user');
  history.replace('/login');
}

async function refreshToken() {
  console.log('Refreshing token!');

  if (!refreshTokenPromise) {
    // promise because even if we simultaniously call refreshToken many times, it will be refreshed only once
    refreshTokenPromise = new Promise((resolve) => {
      try {
        HttpService.post('/auth/refresh', null, 
          (response) => {
            console.log(`Token refreshed and got new: ${response.access_token}`);
            localStorage.setItem('jwt_access_token', response.access_token);
            HttpService.setToken(response.access_token);          
            refreshTokenPromise = null;
            resolve();
          }, 
          (response) => {
            console.warn(`Failed to refresh token. Response: ${JSON.stringify(response)}`);
            refreshTokenPromise = null;
            logout();
            resolve();
          },
          false
        );
      } catch (error) {
        console.warn(`Error when trying to refresh token: ${JSON.stringify(error)}`);
        refreshTokenPromise = null;
        logout();
        resolve();
      }
    });
  }

  await refreshTokenPromise;
}

export function initApp() {
  try {
    const access_token = localStorage.getItem('jwt_access_token');
    HttpService.setToken(access_token);
    HttpService.refreshTokenFunc = refreshToken;
    HttpService.logoutFunc = logout;
  } catch {
    console.error('Failed to initialize app')
  }
}