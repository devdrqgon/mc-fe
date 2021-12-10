
import NewHeader from 'components/header/Header'
import { UserContext } from 'contextProviders/user.context'
import Dashboard from 'features/Dashboard'
import DashboardConnected from 'features/DashboardConnected'
import DashboardShell from 'features/DashboardConnected'
import NewUserWizard from 'features/newUserWizard'
import TestPageRouter from 'features/testLab/TestPageRouter'
import { useContext } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import dark from 'styles/themes/dark'
import light from 'styles/themes/light'
import usePersistedState from 'utils/usePersistedState'
import GlobalStyle from './styles/global'

export const App = () => {
    const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light)
    const toggleTheme = () => {
        setTheme(theme.title === 'light' ? dark : light)
    }
    const history = useHistory()
    const { tokenValid, authenticated } = useContext(UserContext);


    if (history.location.pathname.includes("/test")) {
        return (
            <TestPageRouter />
        )
    }
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <NewHeader _toggletheme={toggleTheme} />
            {tokenValid && authenticated ?
                <>
                    <Switch>
                        <Route path="/" exact component={DashboardConnected}/>
                        <Route path="/newuser" exact
                            render={(props) => (
                                <NewUserWizard
                                    _username={localStorage.getItem('username')!}
                                    _token={`Bearer ${localStorage.getItem('token')!}`}
                                />
                            )}
                        />
                        <Route path="/olduser" exact component={DashboardConnected}/>
                        <Route render={() => <> PageNotFound </>} />
                    </Switch>
                </>
                :
                <>

                </>
            }
        </ThemeProvider>
    )
}
