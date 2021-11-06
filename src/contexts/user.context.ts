import React from 'react'

export interface IUserContext {
    user: string | null;
    token: string | null;
}

/** Initial State */
const UserContext = React.createContext<IUserContext>({
    user: null,
    token: null,
});

export const UserContextProvider = UserContext.Provider;
export const UserContextConsumer = UserContext.Consumer;
export default UserContext;