import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLoginHandler: () => {},
  onLogoutHandler: () => {}  
});

export function AuthContextProvider(props) {
const [isLoggedIn, setIsLoggedIn] = useState(false)

const storedLoggedSitutation = localStorage.getItem('key')
  useEffect(() => {
    if(storedLoggedSitutation === '1') {
      setIsLoggedIn(true)
    }
  }, [storedLoggedSitutation])
  

const onLogoutHandler = () => {
    localStorage.removeItem('key')
    setIsLoggedIn(false)
}

const onLoginHandler = () => {
    setIsLoggedIn(true)
    localStorage.setItem('key', '1')
}


  return <AuthContext.Provider value={{
    isLoggedIn: isLoggedIn,
    onLoginHandler: onLoginHandler,
    onLogoutHandler: onLogoutHandler
  }}>{props.children}</AuthContext.Provider>;
}


export default AuthContext;