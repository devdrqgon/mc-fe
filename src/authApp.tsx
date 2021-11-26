

import { Header } from 'features/appHeader/header'
import { QueryClient, QueryCache, QueryClientProvider } from 'react-query'
import { Switch, Route } from 'react-router'
import { ReactQueryDevtools } from "react-query/devtools"
import NewUserWizard from 'features/newUserWizard'
import Dashboard from 'features/dashboard/dashboard'
import NewDashboard from 'features/dashboard/newDashboard'




const AuthApp = () => {
    return (
        <div style={{
            height: '100vh'
        }}>
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
        </div>

    )
}

export default AuthApp