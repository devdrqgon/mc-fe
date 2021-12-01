import DraggableList from 'components/draggableList'
import LoadingMotion from 'components/loadingMotion'
import NewUserWizard from 'features/newUserWizard'
import { Router, Route, Switch } from 'react-router'
import TestPageHome from './TestPageHome'
import ClonedMotionList from 'components/ClonedMotionList'
import MotionList from 'components/Motionlist'
import BillCreator from 'components/bills/billCreator'
import { useState } from 'react'
import { Bill } from 'react-app-env'
import faker from 'faker'

const TestPageRouter = () => {
    const [uiBills, setUIBills] = useState<Array<Bill>>([{
        billName: "billanme",
        cost: 45,
        when: 2,
        username: "username",
        paid: true
    }])
    const [_items, set_items] = useState<Array<JSX.Element>>([])
    const handleNewBillCallback = (_bill: Bill) => {
        setUIBills(() => [_bill, ...uiBills])
    }
    const _TestToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhwIiwiaWF0IjoxNjM3NTk1MzEwLCJleHAiOjE2Mzc4NTQ1MTAsImlzcyI6IkFtZGV2In0.AXdJ6X6HsHvxlaskLg78a30o3aSC2_u7275VJ9zViDk`
    const _TestUsername = 'mn7'
    const addAtStart = () => set_items([
        <>
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                <div>
                    vodafone
                </div>
                <div>
                    $34
                </div>
            </div>
        </>
        , ..._items])
    const addAtStart2 = () => set_items([
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                <div>
                    o2
                </div>
                <div>
                    $67
                </div>
            </div>
        </>
        , ..._items])
    const name = () => `${faker.name.firstName()} ${faker.name.lastName()}`

    return (
        <>
            <button onClick={addAtStart}>
                addHI
            </button>
            <button onClick={addAtStart2}>
                addBYe
            </button>
            <Switch>
                <Route exact path="/test" component={TestPageHome} />
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
                <Route path="/test/bill" exact
                    render={(props) => (
                        <BillCreator />
                    )}
                />
                <Route path="/test/drag" exact
                    render={(props) => (
                        <DraggableList />
                    )}
                />
                <Route path="/test/list" exact
                    render={(props) => (
                        <>
                            <MotionList items={_items} />
                        </>)}
                />
                <Route path="/test/clonedlist" exact
                    render={(props) => (
                        <ClonedMotionList />
                    )}
                />
            </Switch>
        </>
    )
}



export default TestPageRouter
