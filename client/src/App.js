import React from 'react';
import 'materialize-css';
import {BrowserRouter} from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';

function App() {
  const {login, logout, token, userId} = useAuth();
  //Cast to Boolean
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={ {login, logout, token, userId, isAuthenticated} }>
      <div className="container">
        <BrowserRouter>
          { isAuthenticated && <Navbar /> }
          { routes }
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
