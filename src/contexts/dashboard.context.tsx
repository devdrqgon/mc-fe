import React, { useState } from 'react'
import { UserInfoResponse } from 'react-app-env';


export interface IDashboardContext {
    userInfo: UserInfoResponse | null
}

/** Initial State */
export const DashboardContext = React.createContext<IDashboardContext>({
    userInfo: null
});

interface Props {
    _userInfo: UserInfoResponse | null
}

const DashboardProvider: React.FC<Props> = ({ _userInfo ,  children }) => {
    const [userInfo, setuserInfo] = useState<null | UserInfoResponse>(_userInfo)

    return (
        <DashboardContext.Provider value={{ userInfo }}>
            {children}
        </DashboardContext.Provider>
    )
}

export default DashboardProvider
