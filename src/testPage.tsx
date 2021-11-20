import DraggableList from 'components/draggableList'
import BillCreator from 'components/billCreator'
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router'
import { QueryClientProvider } from 'react-query'
import { queryClient } from 'authApp'
import NewUserChakra from 'features/onBoarding/newUserChakra'

const Testpage = () => {
    useEffect(() => {
        return () => {

        }
    }, [])

    return (
        <>
            <QueryClientProvider client={queryClient}>
                    <Switch>
                        <Route path="/test/bill" exact
                            render={() => (
                                <BillCreator handleBillCallback={() => { }} _uiBillsProp={[{
                                    billName: "samir",
                                    username: " samir",
                                    paid: true,
                                    cost: 22,
                                    when: 2
                                }]} _username={"samir"} />
                            )}
                        />
                        <Route path="/test/drag" exact
                            render={(props) => (
                                <DraggableList />
                            )}
                        />
                        <Route exact path="/test/newuser"
                            render={() => (
                                <NewUserChakra />
                            )}
                        />
                    </Switch>
            </QueryClientProvider>

        </>
    )
}
export default Testpage