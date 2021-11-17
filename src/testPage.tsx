import DraggableList from 'components/draggableList'
import BillCreator from 'features/bill/billCreator'
import PlansOverview from 'features/savingPlan/plans.overview'
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router'

const Testpage = () => {
    useEffect(() => {
        return () => {

        }
    }, [])

    return (
        <>
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
            </Switch>
        </>
    )
}
export default Testpage