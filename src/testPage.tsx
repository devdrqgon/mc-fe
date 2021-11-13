import DraggableList from 'components/draggableList'
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
                <Route path="/test/drag" component={DraggableList} />
               
            </Switch>
        </>
    )
}
export default Testpage