import DraggableList from 'components/draggableList'
import BillCreator from 'components/billCreator'
import PlansOverview from 'features/savingPlan/plans.overview'
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router'
import OnBoarding from 'features/onBoarding/onBoarding'
import { QueryClientProvider } from 'react-query'
import { queryClient } from 'authApp'

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
                    <Route exact path="/test/goals"
                        render={() => (
                            <PlansOverview />
                        )}
                    />
                    <Route exact path="/test/onboarding"
                        render={() => (
                            <OnBoarding _username={"tester"}/>
                        )}
                    />
                </Switch>
            </QueryClientProvider>

        </>
    )
}
export default Testpage