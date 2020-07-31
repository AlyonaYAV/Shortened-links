import React from 'react';
import 'materialize-css';
import {BrowserRouter} from 'react-router-dom';
import { useRoutes } from './routes';
function App() {
  const routes = useRoutes(false);
  return (
    <div className="container">
      <h1>Hello</h1>
      <BrowserRouter>
        { routes }
      </BrowserRouter>
    </div>
  );
}

export default App;
