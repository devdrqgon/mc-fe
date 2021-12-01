import DraggableList from 'components/draggableList'
import LoadingMotion from 'components/loadingMotion'
import NewUserWizard from 'features/newUserWizard'
import { Router, Route, Switch } from 'react-router'
import TestPageHome from './TestPageHome'
import ClonedMotionList from 'components/ClonedMotionList'
import MotionList from 'components/Motionlist'

const TestPageRouter = () => {

    const _TestToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhwIiwiaWF0IjoxNjM3NTk1MzEwLCJleHAiOjE2Mzc4NTQ1MTAsImlzcyI6IkFtZGV2In0.AXdJ6X6HsHvxlaskLg78a30o3aSC2_u7275VJ9zViDk`
    const _TestUsername = 'mn7'
    return (
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
            <Route path="/test/drag" exact
                render={(props) => (
                    <DraggableList />
                )}
            />
            <Route path="/test/list" exact
                render={(props) => (
                    <MotionList />
                )}
            />
            <Route path="/test/clonedlist" exact
                render={(props) => (
                    <ClonedMotionList />
                )}
            />
        </Switch>
    )
}



export default TestPageRouter
