import AuthApp from 'authApp'
import { Header } from 'components/header/Header'
import Main from 'components/ui/Layout/Main'
import { UserContext } from 'contexts/user.context'
import NewLogin from 'features/auth/NewLogin'
import TestPageRouter from 'features/testLab/TestPageRouter'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
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
            {tokenValid && authenticated ?
                <>
                    <AuthApp />
                </>
                :
                <>
                    <UnAuthApp />
                </>
            }
        </ThemeProvider>
    )
}
