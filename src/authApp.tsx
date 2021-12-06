

import { Switch, Route } from 'react-router'
import NewUserWizard from 'features/newUserWizard'
import NewDashboard from 'features/dashboard/newDashboard'
import Card from 'components/ui/Layout/Card/Card'
import { Header } from 'components/header/Header'
import usePersistedState from 'utils/usePersistedState'
import { DefaultTheme } from 'styled-components'
import dark from 'styles/themes/dark'
import light from 'styles/themes/light'




const AuthApp = () => {
    const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', dark)
    const toggleTheme = () => {
        setTheme(theme.title === 'light' ? dark : light)
    }
    return (
        <>
            <Header _toggletheme={toggleTheme} />

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
                <Route render={() => <> PageNotFound </>} />
            </Switch>
        </>
    )
}

export default AuthApp