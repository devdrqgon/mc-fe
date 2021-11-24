import DraggableList from 'components/draggableList'
import BillCreator from 'components/billCreator'
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router'
import { QueryClientProvider } from 'react-query'
import { queryClient } from 'authApp'
import Dashboard from 'features/dashboard/dashboard'
import NewUserWizard from 'features/onBoarding/newUserWizard'
import DashboardDesign from 'pg/dashboardDesign'
import BalanceViewer from 'features/dashboard/balance.viewer'

const Testpage = () => {
    useEffect(() => {
        return () => {

        }
    }, [])
    const _TestToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhwIiwiaWF0IjoxNjM3NTk1MzEwLCJleHAiOjE2Mzc4NTQ1MTAsImlzcyI6IkFtZGV2In0.AXdJ6X6HsHvxlaskLg78a30o3aSC2_u7275VJ9zViDk`
    const _TestUsername = 'mn7'
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Switch>
                    
                    <Route path="/test/newuserwizard" exact
                        render={(props) => (
                            <NewUserWizard _username={_TestUsername} _token={_TestToken} />
                        )}
                    />
                    <Route path="/test/bill" exact
                        render={() => (
                            <BillCreator handleBillCallback={() => { }} _username={_TestUsername} />
                        )}
                    />
                    {/* <Route path="/test/dash" exact
                        render={(props) => (
                            <Dashboard _username={_TestUsername} _token={_TestToken} />
                        )}
                    /> */}
                     <Route path="/test/dash" exact
                        render={(props) => (
                            <DashboardDesign/>
                        )}
                    />
                    <Route path="/test/drag" exact
                        render={(props) => (
                            <DraggableList />
                        )}
                    />
                    
                    <Route path="/test/BalanceViewer" exact
                        render={(props) => (
                            <BalanceViewer />
                        )}
                    />
                
                </Switch>
            </QueryClientProvider>

        </>
    )
}
export default Testpage