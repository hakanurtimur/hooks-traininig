import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth-context';


function App() {
  const ctx = useContext(AuthContext)
  

  return (

    // first i provide it to app component 
    <React.Fragment>
      <MainHeader isAuthenticated={ctx.isLoggedIn} onLogout={ctx.logoutHandler} />
      <main>
        {!ctx.isLoggedIn && <Login/>}
        {ctx.isLoggedIn && <Home/>}
      </main>
    </React.Fragment>
  );
}

export default App;
