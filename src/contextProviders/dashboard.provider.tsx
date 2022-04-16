import axios, { AxiosResponse } from 'axios';
import { NewBill, UserInfoResultDoc } from 'features/auth/SignInCard';
import { BillsHelpers, countDaysDifference, DateHelpers, MoneyHelpers } from 'features/lib';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { Bill, UserInfoResponse } from 'react-app-env';
import { IDashboardContext, BudgetStateUI, SalaryInfoStateUI, SavingPlanStateUI } from './types.dashboardContext';
import { UserContext } from './user.context';


/** Initial State */
export const DashboardContext = React.createContext<IDashboardContext>({
    userInfo: null,
    netto: null,
    BudgetStateUI: null,
    SalaryInfoStateUI: null,
    SavingPlanStateUI: null,
    BillsUI: null,
    refreshUserInfo: () => { }
});

const DashboardProvider: React.FC = ({ children }) => {
    const { user, token } = useContext(UserContext);

    //Context State
    const [userInfo, setuserInfo] = useState<null | UserInfoResultDoc>(null)
    const [BillsUI, setBillsUI] = useState<{
        bills: NewBill[];
        paypalBills: NewBill[];
        manualBills: NewBill[];
    } | null>(null)
    const [BudgetStateUI, setBudgetStateUI] = useState<BudgetStateUI | null>(null)
    const [SalaryInfoStateUI, setSalaryInfoStateUI] = useState<SalaryInfoStateUI | null>(null)
    const [SavingPlanStateUI, setSavingPlanStateUI] = useState<SavingPlanStateUI | null>(null)
    const [netto, setNetto] = useState<null | number>(null)

    const getUserInfo = async () => {
        try {
            const response: AxiosResponse<any, any> = await axios({
                method: 'GET',
                url: `http://localhost:8000/users/info/${user}`,
                headers: {
                    Authorization: `Bearer ${token}`!
                },
            })
            if (response.status === 200) {
                setuserInfo(response.data)
            }

        } catch (error) {

        }
    }
    /** If u wanna change values here from consumers 
     * declare functions here or hooks that consumers can import and in iclude them on value obj of Provider  
     */
    const changeNetto = (_newNetto: number | null) => {
        setNetto(_newNetto)
    }

    const refreshUserInfo = () => {
        getUserInfo()
    }

    useEffect(() => {
        if (userInfo === null && token !== null && user !== null) {
            getUserInfo()
        }
        else if (userInfo !== null) {
            // setBillsUI(userInfo.bills)
            const _daysUntillNextIncome = userInfo.nextIncome.daysleft
            const _weekly = userInfo.maxPerDay * 7

            const _daily = userInfo.maxPerDay

            const _userMinBudget = userInfo.maxPerDay //! this might be null
            //init budget UI State
            setBudgetStateUI({ weekly: _weekly, daily: _daily })



            setSalaryInfoStateUI({
                amount: userInfo.nextIncome.amount,
                // daysLeft: DateHelpers.countDaysUntillNextSalary(userInfo.salary.dayOfMonth)
                daysLeft: userInfo.nextIncome.daysleft
            })
            //Init SavingPlan UI State
            setSavingPlanStateUI(
                {
                    userMinBudget: _userMinBudget,
                    currentDailyBUdget: _daily,
                    daysTillNxtSalary: _daysUntillNextIncome
                }
            )
            setNetto(
                userInfo.balance.netto
            )

            setBillsUI(userInfo.bills)
        }
    }, [user, token, userInfo])
    return (
        <DashboardContext.Provider value={{ refreshUserInfo, userInfo, netto, BudgetStateUI, SalaryInfoStateUI, SavingPlanStateUI, BillsUI }}>
            {children}
        </DashboardContext.Provider>
    )
}

export default DashboardProvider
