import axios, { AxiosResponse } from "axios"
import BillCard from "components/bills/billCard"
import BudgetCard from "components/budget/budgetCard"
import ImpulseController from "components/impulseControl/impulseController"
import SalaryCard from "components/salaryInfo/salaryInfoCard"
import SavingPlanCard from "components/savingPlan/savingPlanCard"
import Card from "components/ui/Layout/Card/Card"
import Grid from "components/ui/Layout/Grid"
import { GridItem } from "components/ui/Layout/GridItem"
import NewCard from "components/ui/Layout/NewCard"
import VContainer from "components/ui/Layout/VContainer"
import { BillsHelpers, dateHelpers } from "features/lib"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { UserInfoResponse } from "react-app-env"
import BalanceCard from "../components/balance.card"

const NewDashboard = (props: { _username: string, _token: string }) => {

    // const {data: infos} = userInfoHooks.useGetUserInfos(props._username, props._token)
    // console.log(infos)


    const getNettoBalance = (grossBalance: number, sumUnpaidBills: number) => {
        return grossBalance - sumUnpaidBills
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




    return (
        <>
            {userInfo === null ?
                <>
                    <VContainer>
                        <Card>
                            loading your Data..
                        </Card>
                    </VContainer>
                </>
                :
                <>
                    <Grid>
                        <GridItem>
                            <NewCard>
                                <BalanceCard
                                    _mainAccountTotalBalance={userInfo.accounts[0].balance!}
                                    _nett={getNettoBalance(userInfo.accounts[0].balance!, BillsHelpers.getSumUnpaidBills(userInfo.bills))}
                                    _unpaidBills={BillsHelpers.getSumUnpaidBills(userInfo.bills)} />

                            </NewCard>

                        </GridItem>

                        <GridItem>
                            <NewCard>
                                <BudgetCard
                                    _weekly={calculateActualWeeklyBudget(
                                        getNettoBalance(userInfo.accounts[0].balance, BillsHelpers.getSumUnpaidBills(userInfo.bills)),
                                        dateHelpers.countDaysUntillNextSalary(userInfo.salary.dayOfMonth))}
                                    _daily={calculateDailyBudget(
                                        getNettoBalance(userInfo.accounts[0].balance, BillsHelpers.getSumUnpaidBills(userInfo.bills)),
                                        dateHelpers.countDaysUntillNextSalary(userInfo.salary.dayOfMonth))} />
                            </NewCard>
                        </GridItem>

                        <GridItem>
                            <NewCard>
                                <SalaryCard
                                    _amount={userInfo.salary.amount}
                                    _daysLeft={dateHelpers.countDaysUntillNextSalary(userInfo.salary.dayOfMonth)}
                                />
                            </NewCard>
                        </GridItem>

                        <GridItem>
                            <NewCard>
                                <BillCard />
                            </NewCard>
                        </GridItem>

                        <GridItem>
                            <NewCard>
                                <ImpulseController />
                            </NewCard>
                        </GridItem>

                        <GridItem>
                            <NewCard>
                                <SavingPlanCard
                                    _userMinBudget={userInfo!.weeklyBudget?.limit! / 7}
                                    _currentDailyBudget={calculateDailyBudget(
                                        getNettoBalance(userInfo!.accounts[0].balance, BillsHelpers.getSumUnpaidBills(userInfo!.bills)),
                                        dateHelpers.countDaysUntillNextSalary(userInfo!.salary.dayOfMonth))}
                                    _daysTillNxtSalary={ dateHelpers.countDaysUntillNextSalary(userInfo!.salary.dayOfMonth)}
                                />
                            </NewCard>
                        </GridItem>
                    </Grid>
                </>
            }
        </>
    )
}

export default NewDashboard