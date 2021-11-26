

import { Header } from 'components/header'
import { Switch, Route } from 'react-router'
import NewUserWizard from 'features/newUserWizard'
import NewDashboard from 'features/dashboard/newDashboard'




const AuthApp = () => {
    return (
        <>
            <Header />
            <Switch>
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

            </Switch>
        </>
    )
}

export default AuthApp