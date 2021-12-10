import axios, { AxiosResponse } from 'axios';
import { BillsHelpers, DateHelpers, MoneyHelpers } from 'features/lib';
import React, { useContext, useEffect, useState } from 'react'
import {  UserInfoResponse } from 'react-app-env';
import { IDashboardContext, BudgetStateUI, SalaryInfoStateUI , SavingPlanStateUI } from './types.dashboardContext';
import { UserContext } from './user.context';


/** Initial State */
export const DashboardContext = React.createContext<IDashboardContext>({
    userInfo: null,
    netto: null,
    BudgetStateUI: null,
    SalaryInfoStateUI: null,
    SavingPlanStateUI: null

});

const DashboardProvider: React.FC = ({ children }) => {
    const { user, token } = useContext(UserContext);

    //State Context 
    const [BudgetStateUI, setBudgetStateUI] = useState<BudgetStateUI | null>(null)
    const [SalaryInfoStateUI, setSalaryInfoStateUI] = useState<SalaryInfoStateUI | null>(null)
    const [SavingPlanStateUI, setSavingPlanStateUI] = useState<SavingPlanStateUI | null>(null)
    const [userIwnfo, setuserInfo] = useState<null | UserInfoResponse>(null)
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
                console.info("DashboardProvider,getUserInfo", response.data.usrInfo[0])

                const _daysUntillNextIncome = DateHelpers.countDaysUntillNextSalary(response.data.usrInfo[0].salary.dayOfMonth)
                const _weekly = MoneyHelpers.calculateActualWeeklyBudget(
                    MoneyHelpers.getNettoBalance(response.data.usrInfo[0].accounts[0].balance, BillsHelpers.getSumUnpaidBills(response.data.usrInfo[0].bills)),
                    _daysUntillNextIncome)

                const _daily = MoneyHelpers.calculateDailyBudget(
                    MoneyHelpers.getNettoBalance(response.data.usrInfo[0].accounts[0].balance, BillsHelpers.getSumUnpaidBills(response.data.usrInfo[0].bills)),
                    _daysUntillNextIncome)

                const _userMinBudget = (response.data.usrInfo[0].weeklyBudget?.limit! / 7)
                //init budget UI State
                setBudgetStateUI({ weekly: _weekly, daily: _daily })

                //Init SalaryInfo UI State
                setSalaryInfoStateUI({ amount: response.data.usrInfo[0].salary.amount, daysLeft: DateHelpers.countDaysUntillNextSalary(response.data.usrInfo[0].salary.dayOfMonth) })
                //Init SavingPlan UI State
                setSavingPlanStateUI(
                    {
                        userMinBudget: _userMinBudget,
                        currentDailyBUdget: _daily,
                        daysTillNxtSalary: _daysUntillNextIncome
                    }
                )
                setuserInfo(response.data.usrInfo[0])
                setNetto(MoneyHelpers.getNettoBalance(response.data.usrInfo[0].accounts[0].balance, BillsHelpers.getSumUnpaidBills(response.data.usrInfo[0].bills)))

            }

        } catch (error) {

        }
    }
    /** If u wanna change values here from consumers 
     * declare functions here or hhoks that consumers can import and in iclude them on value obj of Provider  
     */
    const changeNetto = (_newNetto: number | null) => {
        setNetto(_newNetto)
    }

    useEffect(() => {
        if(user !== null && token !== null){
            getUserInfo()
        }
       
    }, [user,token])
    return (
        <DashboardContext.Provider value={{ userInfo: userIwnfo, netto, BudgetStateUI, SalaryInfoStateUI, SavingPlanStateUI }}>
            {children}
        </DashboardContext.Provider>
    )
}

export default DashboardProvider