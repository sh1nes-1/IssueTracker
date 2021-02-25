import HttpService from 'services/HttpService';
import history from '../history';

let refreshTokenPromise = null;

function logout() {
  console.log('Logout!');
  HttpService.setToken(null);
  localStorage.removeItem('jwt_access_token');
  localStorage.removeItem('user');
  history.replace('/login');
}

async function refreshToken() {
  console.log('Refreshing token!');

  if (!refreshTokenPromise) {
    if (!HttpService.refresh_token) {
      console.warn('Refresh token is not exists!');
      return;
    }

    // promise because even if we simultaniously call refreshToken many times, it will be refreshed only once
    refreshTokenPromise = new Promise((resolve) => {
      try {
        HttpService.post('/auth/refresh', null, 
          (response) => {
            console.log(`Token refreshed and got new: ${response.access_token}`);

            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);

            HttpService.setToken(response.access_token);
            HttpService.setRefreshToken(response.refresh_token);

            refreshTokenPromise = null;
            resolve();
          }, 
          (response) => {
            console.warn(`Failed to refresh token. Response: ${JSON.stringify(response)}`);
            console.warn(`Old token: ${HttpService.access_token}`);

            refreshTokenPromise = null;
            resolve();
          },
          false,
          HttpService.refresh_token
        );
      } catch (error) {
        console.warn(`Error when trying to refresh token: ${JSON.stringify(error)}`);
        refreshTokenPromise = null;
        resolve();
      }
    });
  }

  await refreshTokenPromise;
}

export function initApp() {
  try {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    HttpService.setToken(access_token);    
    HttpService.setRefreshToken(refresh_token);

    HttpService.refreshTokenFunc = refreshToken;
    HttpService.logoutFunc = logout;
  } catch {
    console.error('Failed to initialize app')
  }
}