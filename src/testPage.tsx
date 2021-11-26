import DraggableList from 'components/draggableList'
import BillInput from 'components/billIInput'
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router'
import { QueryClientProvider } from 'react-query'
import Dashboard from 'features/dashboard/dashboard'
import NewUserWizard from 'features/newUserWizard'
import BalanceCard from 'features/dashboard/balance.card'

const Testpage = () => {
    useEffect(() => {
        return () => {

        }
    }, [])
    const _TestToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhwIiwiaWF0IjoxNjM3NTk1MzEwLCJleHAiOjE2Mzc4NTQ1MTAsImlzcyI6IkFtZGV2In0.AXdJ6X6HsHvxlaskLg78a30o3aSC2_u7275VJ9zViDk`
    const _TestUsername = 'mn7'
    return (
        <>
            <Switch>

                <Route path="/test/newuserwizard" exact
                    render={(props) => (
                        <NewUserWizard _username={_TestUsername} _token={_TestToken} />
                    )}
                />
                <Route path="/test/bill" exact
                    render={() => (
                        <BillInput handleBillCallback={() => { }} _username={_TestUsername} />
                    )}
                />
                <Route path="/test/drag" exact
                    render={(props) => (
                        <DraggableList />
                    )}
                />

                <Route path="/test/BalanceViewer" exact
                    render={(props) => (
                        <BalanceCard _nett={900} _unpaidBills={100} _mainAccountTotalBalance={1000} />
                    )}
                />

            </Switch>

        </>
    )
}
export default Testpage