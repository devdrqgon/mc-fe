import React, { useEffect } from 'react'
import authUtils from 'features/auth/utils.auth'
import logging from 'config/logging';



export interface IUserContext {
  user: string | null;
  token: string | null;
  tokenValid: boolean,
  authenticated: boolean,
  login: (_username: string, _token: string) => void,
  logout: () => void
}
/** Initial State */
export const UserContext = React.createContext<IUserContext>({
  user: null,
  token: null,
  tokenValid: false,
  authenticated: false,
  login: (_username: string, _token: string) => { },
  logout: () => { }

});

const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = React.useState<string | null>(null)
  const [token, setToken] = React.useState<string | null>(null)
  const [tokenValid, setTokenValid] = React.useState(false)
  const [authenticated, setAuthenticated] = React.useState(false)

  useEffect(() => {
    async function validatetoken(token: string) {
      const result = await authUtils.StoredTokenIsValid(token)
      if (result) {
        logging.info("UserProvider", "Token verified by backend!");
        setTokenValid(true)
        setAuthenticated(true)
      }
      else {
        logging.info("UserProvider", "Token Declined  by backend!");
        setTokenValid(false)
        setAuthenticated(false)

      }
    }

    const _token = localStorage.getItem('token')
    const _username= localStorage.getItem('username')
    if (_token && _username) {
      logging.info("UserProvider","Found username and token")
      validatetoken(_token)
      if (tokenValid) {
        logging.info("UserProvider","Token was validated by backend!!")

        //if Valid
        // set username, token and token Valid
        login(_username,_token)
        
      }


      //Else if token unidentified or expired 
      // 
    }
    else {
      console.log("ssdsds")
      //There is no stored token/username in localStorage, so we reset the localstorage and hooks
      logout()
    }
  }, [])
  const login = (_username: string, _token: string) => {
    setUser(_username)
    setToken(_token)
    setTokenValid(true)
    setAuthenticated(true)
    localStorage.setItem('token', _token)
    localStorage.setItem('username', _username)

  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setTokenValid(false)
    setAuthenticated(false)
    localStorage.removeItem('token')
  }

  return (
    <UserContext.Provider value={{ user, token, tokenValid,authenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider