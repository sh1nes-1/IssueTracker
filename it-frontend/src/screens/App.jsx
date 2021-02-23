import '../assets/styles/App.css';

import React from 'react';
import { renderRoutes } from "react-router-config";

function App({ route }) {
  return (
    <div className="App">      
      {renderRoutes(route.routes)}
    </div>
  );
}

export default App;