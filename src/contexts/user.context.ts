import React from 'react'
import IUser from 'interfaces/user.interface'

export interface IUserContext {
    user: IUser | null;
    token: string | null;
    Login: (user: IUser, token: string) => void;
    Logout: () => void;
}

/** Initial State */
const UserContext = React.createContext<IUserContext>({
    user: null,
    token: null,
    Login: (user: IUser, token: string) => { },
    Logout: () => { }
});

export const UserContextProvider = UserContext.Provider;
export const UserContextConsumer = UserContext.Consumer;
export default UserContext;