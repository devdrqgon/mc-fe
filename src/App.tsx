
import NewHeader from 'components/header/Header'
import Modal from 'components/ui/Modal/Modal'
import ModalProvider from 'contextProviders/modal.provider'
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
    const { authenticated } = useContext(UserContext);


    if (history.location.pathname.includes("/test")) {
        return (
            <TestPageRouter />
        )
    }
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ModalProvider>
                <Modal />
                <NewHeader _toggletheme={toggleTheme} />
                {authenticated ?
                    <>
                        <Switch>
                            <Route path="/" exact component={DashboardConnected} />
                            <Route path="/newuser" exact component={NewUserWizard} />
                            <Route path="/olduser" exact component={DashboardConnected} />
                            <Route render={() => <> PageNotFound </>} />
                        </Switch>
                    </>
                    :
                    <>

                    </>
                }∏
            </ModalProvider>

        </ThemeProvider>
    )
}
