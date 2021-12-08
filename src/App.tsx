
import NewHeader from 'components/header/NewHeader'
import { UserContext } from 'contexts/user.context'
import NewDashboard from 'features/Dashboard'
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
    const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', dark)
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
            <NewHeader />
            {tokenValid && authenticated ?
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
