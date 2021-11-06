import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { TimespanPlanner } from './features/timespanPlanner/timeSpanPlanner';
import { ReactQueryDevtools } from 'react-query/devtools'
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Sample from 'features/planOverview/sample';
import logging from 'config/logging';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserContextProvider } from 'contexts/user.context';
import Register from 'tmpPagesAuth/register.component';
import LoginPage from 'tmpPagesAuth/login.component';
import TmpHome from 'tmpPagesAuth/tmpHome.componenet';
import authUtils from 'features/auth/utils.auth'
const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error: any) =>
            toast.error(`Something went wrong: ${error.message}`),
    }),
})

const COMPOENENT = "McApp"

const Mcapp = () => {
    /** Application State Values */
    const [user, setUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    /** change pages without using redirect  */
    const history = useHistory()

    useEffect(() => {
        logging.info(COMPOENENT, "Loading app..")
        async function validatetoken(token: string) {
            await authUtils.StoredTokenIsValid(token)
            
        }

        if (authUtils.localStorageHasData()) {
            const usrFromStorage = localStorage.getItem('user')
            const tokenFromStorage = localStorage.getItem('token')
           
           
            validatetoken(tokenFromStorage || '')
            if (localStorage.getItem('tokenFlag') && localStorage.getItem('tokenFlag') === 'valid') {
                /** User's token validated, so we redirect him to :  */
                setLoading(false)
                setToken(tokenFromStorage)
                setUser(usrFromStorage)
                history.push(history.location.pathname)
            }
            else {
                authUtils.ResetUserLocalData()
                history.push("/login")
                setLoading(false)
                setToken(null)
                setUser(null)
            }
        }
        else {
            authUtils.ResetUserLocalData()
            history.push("/login")
            logging.info(COMPOENENT, "redirecting to login Page")
            setLoading(false)
            setToken(null)
            setUser(null)
        }
    }, [])

    if (loading) return <h1>Loading..</h1>

    let userContextValue = {
        user,
        token,
    }


    return (
        <UserContextProvider value={userContextValue}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/planner" component={TimespanPlanner} />
                        <Route path="/sample" component={Sample} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={LoginPage} />
                    </Switch>
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster />
            </QueryClientProvider>
        </UserContextProvider>
    )
}

export default Mcapp
