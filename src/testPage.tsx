import DraggableList from 'components/draggableList'
import BillCreator from 'components/billCreator'
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router'
import { QueryClientProvider } from 'react-query'
import { queryClient } from 'authApp'
import Dashboard from 'features/dashboard/dashboard'
import NewUserWizard from 'features/onBoarding/newUserWizard'

const Testpage = () => {
    useEffect(() => {
        return () => {

        }
    }, [])
    const _TestToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZsYWQiLCJpYXQiOjE2Mzc0NDQzMjIsImV4cCI6MTYzNzcwMzUyMiwiaXNzIjoiQW1kZXYifQ.VIKg7HhHPX3Vl3MvxnqC2FCi9ZK06oJFiA39cNELUug`
    const _TestUsername = 'vlad'
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
                            <BillCreator handleBillCallback={() => { }} _username={"samir"} />
                        )}
                    />
                    <Route path="/test/dash" exact
                        render={(props) => (
                            <Dashboard />
                        )}
                    />
                    <Route path="/test/drag" exact
                        render={(props) => (
                            <DraggableList />
                        )}
                    />
                
                </Switch>
            </QueryClientProvider>

        </>
    )
}
export default Testpage