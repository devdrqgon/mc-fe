import { Route, Switch } from "react-router-dom"
import LoginPage from "features/auth/login.component"
import Register from "features/auth/register.component"

const UnAuthApp=() => {
    return(
        <Switch>
            <Route exact path={'/'} component={LoginPage}></Route>
            <Route path={'/login'} component={LoginPage}></Route>
            <Route path={'/register'} component={Register}></Route>
        </Switch>
    ) 
}

export default UnAuthApp