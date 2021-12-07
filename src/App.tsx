import AuthApp from 'authApp'
import { Header } from 'components/header/Header'
import NewHeader from 'components/header/NewHeader'
import Main from 'components/ui/Layout/Main'
import { UserContext } from 'contexts/user.context'
import NewLogin from 'features/auth/NewLogin'
import NewRegister from 'features/auth/NewRegister'
import NewDashboard from 'features/dashboard/newDashboard'
import NewUserWizard from 'features/newUserWizard'
import TestPageRouter from 'features/testLab/TestPageRouter'
import React, { useContext } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import dark from 'styles/themes/dark'
import light from 'styles/themes/light'
import UnAuthApp from 'unAuthApp'
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
                        <Route path="/register" exact
                            component={NewRegister}
                        />
                        <Route render={() => <> PageNotFound </>} />
                    </Switch>
                </>
                :
                <>
                    <Switch>

                        <Route path="/register" exact
                            component={NewRegister}
                        />

                        <Route path="/login" exact
                            component={NewLogin}
                        />
                        <Route render={() => <> PageNotFound </>} />
                    </Switch>
                </>
            }
        </ThemeProvider>
    )
}
