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
    const SaveLoginData = (_user: string, _token: string) => {
        setUser(_user);
        setToken(_token);

        localStorage.setItem('user', JSON.stringify(_user));
        localStorage.setItem('token', _token);
    }

    const Logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        setUser(null);
        setToken(null);
    }
    const VerifyLocalStorageCredentials = async (_user: string, _token: string) => {
        try {
            let _parsedUser = JSON.parse(_user)
            console.log(_parsedUser)
            let response = await axios({
                method: 'GET',
                url: 'http://localhost:8000/users/validate',
                headers: {
                    Authorization: `Bearer ${_token}`
                }
            })

            if (response.status === 200 || response.status === 304) {
                SaveLoginData(_parsedUser, _token)
                setLoading(false)
                history.push('/planner')

            }
            else {
                logging.info(COMPOENENT, 'credentials no longer valid')
                Logout()
                history.push('/login')
                setLoading(false)
            }
        } catch (error) {
            logging.error(COMPOENENT, (error as Error).message, error)
            Logout()
        }
    }
    useEffect(() => {
        logging.info(COMPOENENT, "Loading app..")

        if (user === null || token === null) {
            logging.info(COMPOENENT, 'Not logged in in current session, checking localstorage');

            let _token = localStorage.getItem('token')
            let _user = localStorage.getItem('user')

            if (_user === null || _token === null) {
                logging.info(COMPOENENT, 'Nothing in localstorage, removing vars and redirecting');

                Logout()
                if (history.location.pathname !== "/register") {
                    history.push('/login')
                }
                setLoading(false)
            }
            else {
                logging.info('Credentials found, verifying.', 'Auth')
                SaveLoginData(_user, _token)
                VerifyLocalStorageCredentials(_user, _token)
                
            }
        }
    }, [])

    if (loading) return <h1>Loading..</h1>
    
    let userContextValue = {
        user,
        token,
        SaveLoginData,
        Logout
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
