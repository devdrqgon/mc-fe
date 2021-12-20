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
import DashboardProvider, { DashboardContext } from "contextProviders/dashboard.provider"
import { BillsHelpers, DateHelpers, MoneyHelpers } from "features/lib"
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { UserInfoResponse } from "react-app-env"
import BalanceCard from "../components/balance.card"

const DashboardNew = () => {
    const { userInfo } = useContext(DashboardContext)

    
    return (
        <>
                {userInfo === null ?
                <>
                    <h1> Waiting for userinfo..</h1>
                </>
                :
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
            }
        </>
    )
}

export default DashboardNew

/**
 * 
 * lul, fear, 
 * *notice the fear you have in the middle of a conflict. 
 *  
 * The whole situation is overwhlming him,
 *  He could use the opportunity, to finally move his ass 
 * and move from linz. 
 * 
 * Also what happened yesterday, was the push he needed to 
 * finally make a decision. he must move. Now he is a man with a clearer vision. 
 *  
 * this realisation, brings with it conflict feelings  & thoughts, in simpler words.. fear(1).
 * 
 * Now here is how he can move: 
 *  - get motivated and grounded in this phase, and remember this may be hard b ut it is also your way OUT.
 *  - Abbau  
 *  - Secure money for transportation
 *  - Secure money for first rent
 *  - Secure money for Deposit 
 * 
 * (1)
 * He can decide to :
 *                  live aware in fear, and not let it control its life, 
 *                  or live unconscious and stoned. 
 * He can decide:
 *           to face & interact with life or 
 *           close in the face of pain.
 * 
 * 
 * 
 * 
 *   
 * 
 */