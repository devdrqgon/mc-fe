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
import DashboardProvider, { DashboardContext } from "contexts/dashboard.context"
import { BillsHelpers, DateHelpers, MoneyHelpers } from "features/lib"
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { UserInfoResponse } from "react-app-env"
import BalanceCard from "../components/balance.card"

const Dashboard = (props: { _username: string, _token: string }) => {


    return (
        <>
            <DashboardProvider  >
                <Grid>
                    <GridItem>
                        <NewCard>
                            <BalanceCard />
                        </NewCard>

                    </GridItem>

                    <GridItem>
                        <NewCard>
                            <BudgetCard />
                        </NewCard>
                    </GridItem>

                    <GridItem>
                        <NewCard>
                            <SalaryCard />
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
                            <SavingPlanCard />
                        </NewCard>
                    </GridItem>
                </Grid>
            </DashboardProvider>
        </>
    )
}

export default Dashboard