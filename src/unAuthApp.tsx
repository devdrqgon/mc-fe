import { Route, Switch } from "react-router-dom"
import LoginPage from "tmpPagesAuth/login.component"
import Register from "tmpPagesAuth/register.component"

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