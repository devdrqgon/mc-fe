

import { Switch, Route } from 'react-router'
import NewUserWizard from 'features/newUserWizard'
import NewDashboard from 'features/dashboard/newDashboard'
import NewRegister from 'features/auth/NewRegister'



const AuthApp = () => {
  
    return (
        <>

            <Switch>
                <Route path="/" exact
                    render={(props) => (
                        <NewDashboard
                            _username={localStorage.getItem('username')!}
                            _token={`Bearer ${localStorage.getItem('token')!}`}
                        />
                    )}
                />
                <Route path="/newuser" exact
                    render={(props) => (
                        <NewUserWizard
                            _username={localStorage.getItem('username')!}
                            _token={`Bearer ${localStorage.getItem('token')!}`}
                        />
                    )}
                />
                <Route path="/olduser" exact
                    render={(props) => (
                        <NewDashboard
                            _username={localStorage.getItem('username')!}
                            _token={`Bearer ${localStorage.getItem('token')!}`}
                        />
                    )}
                />
                 <Route path="/register" exact
                    component={NewRegister}
                />
                <Route render={() => <> PageNotFound </>} />
            </Switch>
        </>
    )
}

export default AuthApp