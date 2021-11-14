import DraggableList from 'components/draggableList'
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
                <Route path="/test/drag" exact
                    render={(props) => (
                        <DraggableList  />
                    )}
                />
                 <Route exact path="/test/goals"
                    render={() => (
                        <PlansOverview   />
                    )}
                />
            </Switch>
        </>
    )
}
export default Testpage