// import DraggableList from 'components/draggableList'
// import LoadingMotion from 'components/loadingMotion'
import NewUserWizard from 'features/newUserWizard'
import { Router, Route, Switch } from 'react-router'
import TestPageHome from './TestPageHome'
import ClonedMotionList from 'components/ClonedMotionList'
import MotionList from 'components/Motionlist'
import { useState } from 'react'
import { Bill } from 'react-app-env'
import faker from 'faker'
import BillItem from 'components/bills/BillItem'
import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import ModalChild from 'components/ui/Modal/ModalChild'
import ModalPortal from 'components/ui/Modal/PortalModal'

const TestPageRouter = () => {

    const _TestToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhwIiwiaWF0IjoxNjM3NTk1MzEwLCJleHAiOjE2Mzc4NTQ1MTAsImlzcyI6IkFtZGV2In0.AXdJ6X6HsHvxlaskLg78a30o3aSC2_u7275VJ9zViDk`
    const _TestUsername = 'mn7'
    const _dummyBill = {
        billName: "billanme",
        cost: 45,
        when: 2,
        username: "username",
        paid: true
    }

    return (
        <>
            <Switch>
                <Route exact path="/test" component={TestPageHome} />
                
                <Route path="/test/bill" exact
                    render={(props) => (
                        <BillItem _bill={_dummyBill} />
                    )}
                />
                {/* <Route path="/test/loading" exact
                    render={(props) => (
                        <LoadingMotion />
                    )}
                /> */}
                <Route path="/test/newuser" exact
                    render={(props) => (
                        <NewUserWizard _username={_TestUsername} _token={_TestToken} />
                    )}
                />
                {/* <Route path="/test/drag" exact
                    render={(props) => (
                        <DraggableList />
                    )}
                /> */}
                <Route path="/test/list" exact
                    render={(props) => (
                        <>
                            <MotionList _items={[]} />
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

