import '../assets/styles/App.css';

import React from 'react';
import { renderRoutes } from "react-router-config";

import { Provider } from 'react-redux';
import { store } from '../configureStore';

function App({ route }) {
  return (
    <div className="App">
      <Provider store={store}>
        {renderRoutes(route.routes)}
      </Provider>
    </div>
  );
}

export default App;
