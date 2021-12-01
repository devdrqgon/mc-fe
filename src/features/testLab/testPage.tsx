import DraggableList from 'components/draggableList'
import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router'
import NewUserWizard from 'features/newUserWizard'
import BalanceCard from 'components/balance.card'
import BillCreator from 'components/bills/billCreator'
import { Bill } from 'react-app-env'
import LoadingMotion from 'components/loadingMotion'

const Testpage = () => {
    const [uiBills, setUIBills] = useState<Array<Bill>>([])

    const handleNewBillCallback = (_bill: Bill) => {
        setUIBills(() => [_bill, ...uiBills])
    }
    useEffect(() => {
        return () => {

        }
    }, [])
    const _TestToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhwIiwiaWF0IjoxNjM3NTk1MzEwLCJleHAiOjE2Mzc4NTQ1MTAsImlzcyI6IkFtZGV2In0.AXdJ6X6HsHvxlaskLg78a30o3aSC2_u7275VJ9zViDk`
    const _TestUsername = 'mn7'
    return (
        <>
            <Switch>

                <Route path="/test/loading" exact
                    render={(props) => (
                        <LoadingMotion />
                    )}
                />
                <Route path="/test/newuserwizard" exact
                    render={(props) => (
                        <NewUserWizard _username={_TestUsername} _token={_TestToken} />
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
                <Route path="/test/bill" exact
                    render={(props) => (
                        <BillCreator _uiBills={uiBills} _handleNewBillCallback={handleNewBillCallback} />
                    )}
                />

            </Switch>

        </>
    )
}
export default Testpage