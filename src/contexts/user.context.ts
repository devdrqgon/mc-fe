import React from 'react'

export interface IUserContext {
    user: string | null;
    token: string | null;
    SaveLoginData: (user: string, token: string) => void;
    Logout: () => void;
}

/** Initial State */
const UserContext = React.createContext<IUserContext>({
    user: null,
    token: null,
    SaveLoginData: (user: string, token: string) => { },
    Logout: () => { }
});

export const UserContextProvider = UserContext.Provider;
export const UserContextConsumer = UserContext.Consumer;
export default UserContext;