import { BillsHelpers, MoneyHelpers } from 'features/lib';
import React, { useEffect, useState } from 'react'
import { AccountsInfo, UserInfoResponse } from 'react-app-env';


export interface IDashboardContext {
    userInfo: UserInfoResponse | null,
    netto: number | null
}

/** Initial State */
export const DashboardContext = React.createContext<IDashboardContext>({
    userInfo: null,
    netto: null
});

interface Props {
    userInfoProp: UserInfoResponse | null

}


const DashboardProvider: React.FC<Props> = ({ userInfoProp,children }) => {
    const [userInfo, setuserInfo] = useState<null | UserInfoResponse>(null)
    const [netto, setNetto] = useState<null | number>(null)

    /** If u wanna change values here from consumers 
     * declare functions here or hhoks that consumers can import and use 
     */
    const changeNetto = (_newNetto: number | null) => {
        setNetto(_newNetto)
    }

    useEffect(() => {
        setuserInfo(userInfoProp)
        
        if (userInfoProp !== null) {
            setNetto(MoneyHelpers.getNettoBalance(userInfoProp.accounts[0].balance, BillsHelpers.getSumUnpaidBills(userInfoProp.bills)))
        }
        else setNetto(null)
    }, [userInfoProp])
    return (
        <DashboardContext.Provider value={{ userInfo, netto}}>
            {children}
        </DashboardContext.Provider>
    )
}

export default DashboardProvider
