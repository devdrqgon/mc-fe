import React, { useEffect } from 'react'
import authUtils from 'features/auth/utils.auth'
import logging from 'config/logging';
import { useHistory } from 'react-router';



export interface IUserContext {
  user: string | null;
  token: string | null;
  authenticated: boolean,
  login: (_username: string, _token: string) => void,
  logout: () => void
}
/** Initial State */
export const UserContext = React.createContext<IUserContext>({
  user: null,
  token: null,
  authenticated: false,
  login: (_username: string, _token: string) => { },
  logout: () => { }

});

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<string | null>(null)
  const [token, setToken] = React.useState<string | null>(null)
  const [authenticated, setAuthenticated] = React.useState(false)

  useEffect(() => {
    async function validatetoken(token: string, username: string) {
      const result = await authUtils.StoredTokenIsValid(token)
      if (result) {
        logging.info("UserProvider", "Token verified by backend!");
        setAuthenticated(true)
        login(username, token)
      }
      else {
        logging.info("UserProvider", "Token Declined  by backend!");
        setAuthenticated(false)
        logout()


      }
    }

    const _token = localStorage.getItem('token')
    const _username = localStorage.getItem('username')
    if (_token && _username) {
      logging.info("UserProvider", "Found username and token")
      validatetoken(_token, _username)
    }
    else {
      //There is no stored token/username in localStorage, so we reset the localstorage and hooks
      logout()
      logging.info("UserProvider", "No Stored Username or token, resetiing localstorage and hooks!")
    }
  }, [])
  const login = (_username: string, _token: string) => {
    setUser(_username)
    setToken(_token)
    localStorage.setItem('token', _token)
    localStorage.setItem('username', _username)
    setAuthenticated(true)

  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setAuthenticated(false)

  }

  return (
    <UserContext.Provider value={{ user, token, authenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider