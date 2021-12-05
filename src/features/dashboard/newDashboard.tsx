import axios, { AxiosResponse } from "axios"
import BillCard from "components/bills/billCard"
import BudgetCard from "components/budget/budgetCard"
import ImpulseController from "components/impulseControl/impulseController"
import SalaryCard from "components/salaryInfo/salaryInfoCard"
import SavingPlanCard from "components/savingPlan/savingPlanCard"
import { AlignmentOptions } from "components/ui/Layout"
import Card from "components/ui/Layout/Card"
import Grid from "components/ui/Layout/Grid"
import { GridItem } from "components/ui/Layout/GridItem"
import HContainer from "components/ui/Layout/HContainer"
import NewCard from "components/ui/Layout/NewCard"
import VContainer from "components/ui/Layout/VContainer"
import { getSumPaidills, getSumUnpaidBills } from "features/lib"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Bill, UserInfoResponse } from "react-app-env"
import BalanceCard from "../../components/balance.card"

const NewDashboard = (props: { _username: string, _token: string }) => {

    // const {data: infos} = userInfoHooks.useGetUserInfos(props._username, props._token)
    // console.log(infos)
    const [showImpulseController, setshowImpulseController] = useState(false)
    const [weeklyIC, setWeeklyIC] = useState(0)
    const [dailyIC, setDailyIC] = useState(0)

    const desireRef = useRef<HTMLInputElement>(null)

    const caluclateConsequenceIC = () => {

        setshowImpulseController(true)

        const desire = parseFloat(desireRef.current!.value)

        // get netto Balance 
        const netto = getNettoBalance(userInfo?.accounts[0].balance!, getSumUnpaidBills(userInfo?.bills!))
        // get how many days left till next salary 
        let daysLeft = countDaysUntillNextSalary(userInfo?.salary.dayOfMonth!)
        const res = netto - desire
        setWeeklyIC(calculateActualWeeklyBudget(res, daysLeft))
        setDailyIC(calculateDailyBudget(res, daysLeft))

    }
    const getNettoBalance = (grossBalance: number, sumUnpaidBills: number) => {
        return grossBalance - sumUnpaidBills
    }

    const countDaysUntillNextSalary = (dayOfSalary: number) => {
        const today = new Date().getDate()
        if (today === dayOfSalary) { return 0 }
        if (today < dayOfSalary) {
            return (dayOfSalary - today)
        }
        else {
            //the remaining days of the current month + the days of the next month 
            //count days till end of month
            //get last day of the current month 
            const todayAgain = new Date();
            const lastDayOfMonth = new Date(todayAgain.getFullYear(), todayAgain.getMonth() + 1, 0).getDate()
            let daysleft = lastDayOfMonth - today
            daysleft = daysleft + dayOfSalary
            return daysleft
        }
    }
    const [userInfo, setuserInfo] = useState<null | UserInfoResponse>(null)
    const getUserInfo = async () => {
        try {
            const response: AxiosResponse<any, any> = await axios({
                method: 'GET',
                url: `http://localhost:8000/users/info/${props._username}`,
                headers: {
                    Authorization: props._token
                },
            })
            if (response.status === 200) {
                setuserInfo(response.data.usrInfo[0])

            }

        } catch (error) {

        }
    }

    const calculateActualWeeklyBudget = (nettoBalance: number, daysLeft: number) => {
        return ((nettoBalance / daysLeft) * 7)
    }

    const calculateDailyBudget = (nettoBalance: number, daysLeft: number) => {
        return ((nettoBalance / daysLeft))
    }
    useEffect(() => {
        if (userInfo === null) {
            getUserInfo()
        }
    }, [userInfo])

    //Modal
    const [loading, setLoading] = useState<React.ReactNode>(
        <VContainer>
            <Card>
                loading your Data..
            </Card>
        </VContainer>
    )




    return (
        <>
            {userInfo === null ?
                <>
                    {loading}
                </>
                :
                <>
                    <Grid>
                        <GridItem>
                            <NewCard>
                                <BalanceCard
                                _mainAccountTotalBalance={userInfo.accounts[0].balance!}
                                _nett={getNettoBalance(userInfo.accounts[0].balance!, getSumUnpaidBills(userInfo.bills))}
                                _unpaidBills={getSumUnpaidBills(userInfo.bills)} />
                           
                            </NewCard>

                        </GridItem>

                        <GridItem>
                            <h1>hi</h1>
                            {/* <BudgetCard
                                _weekly={calculateActualWeeklyBudget(
                                    getNettoBalance(userInfo.accounts[0].balance, getSumUnpaidBills(userInfo.bills)),
                                    countDaysUntillNextSalary(userInfo.salary.dayOfMonth))}
                                _daily={calculateDailyBudget(
                                    getNettoBalance(userInfo.accounts[0].balance, getSumUnpaidBills(userInfo.bills)),
                                    countDaysUntillNextSalary(userInfo.salary.dayOfMonth))} />
                            */}

                        </GridItem>

                        <GridItem>
                            <h1>hi</h1>
                            {/* <SalaryCard
                                _amount={userInfo.salary.amount}
                                _daysLeft={countDaysUntillNextSalary(userInfo.salary.dayOfMonth)}
                            /> */}

                        </GridItem>

                        <GridItem>
                            <h1>hi</h1>
                            {/* <BillCard
                            />
                             */}

                        </GridItem>

                        <GridItem>
                            <h1>hi</h1>
                            {/* <ImpulseController /> */}


                        </GridItem>
                        <GridItem>
                            {/* <SavingPlanCard
                                _userMinBudget={userInfo!.weeklyBudget?.limit! / 7}
                                _currentDailyBudget={calculateDailyBudget(
                                    getNettoBalance(userInfo!.accounts[0].balance, getSumUnpaidBills(userInfo!.bills)),
                                    countDaysUntillNextSalary(userInfo!.salary.dayOfMonth))}
                                _daysTillNxtSalary={countDaysUntillNextSalary(userInfo!.salary.dayOfMonth)}
                            /> */}
                            <h1>hi</h1>

                        </GridItem>
                    </Grid>
                </>
            }
        </>
    )
}

export default NewDashboard