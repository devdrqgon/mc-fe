import { Route, Switch } from "react-router-dom"
import NewLogin from "features/auth/NewLogin"
import NewRegister from "features/auth/NewRegister"

const UnAuthApp=() => {
    return(
        <Switch>
            <Route exact path={'/'} component={NewLogin}></Route>
            <Route path={'/login'} component={NewLogin}></Route>
            <Route path={'/register'} component={NewRegister}></Route>
            <Route render={() => <> PageNotFound </>} />

        </Switch>
    ) 
}

export default UnAuthApp