import React from 'react'


export interface IDashboardContext {
    
  }

  /** Initial State */
export const UserContext = React.createContext<IDashboardContext>({
    user: null,
    token: null,
    tokenValid: false,
    authenticated: false,
    login: (_username: string, _token: string) => { },
    logout: () => { }
  
  });

const DashboardContextUserProvider = () => {
    return (
        <div>
            
        </div>
    )
}

export default DashboardContextUserProvider
