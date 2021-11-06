import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { TimespanPlanner } from './features/timespanPlanner/timeSpanPlanner';
import { ReactQueryDevtools } from 'react-query/devtools'
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Sample from 'features/planOverview/sample';
import logging from 'config/logging';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserProvider, { UserContext } from 'contexts/user.context';
import Register from 'tmpPagesAuth/register.component';
import LoginPage from 'tmpPagesAuth/login.component';
import TmpHome from 'tmpPagesAuth/tmpHome.componenet';
import authUtils from 'features/auth/utils.auth'
import EntryComponent from 'entryComponent';


const COMPOENENT = "McApp"

const Mcapp = () => {
    /** Application State Values */


    // useEffect(() => {
    //     logging.info(COMPOENENT, "Loading app..")
    //     async function validatetoken(token: string) {
    //         await authUtils.StoredTokenIsValid(token)
            
    //     }

    //     if (authUtils.localStorageHasData()) {
    //         const usrFromStorage = localStorage.getItem('user')
    //         const tokenFromStorage = localStorage.getItem('token')
           
           
    //         validatetoken(tokenFromStorage || '')
    //         if (localStorage.getItem('tokenFlag') && localStorage.getItem('tokenFlag') === 'valid') {
    //             /** User's token validated, so we redirect him to :  */
    //             setLoading(false)
    //             setToken(tokenFromStorage)
    //             setUser(usrFromStorage)
    //             history.push(history.location.pathname)
    //         }
    //         else {
    //             authUtils.ResetUserLocalData()
    //             history.push("/login")
    //             setLoading(false)
    //             setToken(null)
    //             setUser(null)
    //         }
    //     }
    //     else {
    //         authUtils.ResetUserLocalData()
    //         history.push("/login")
    //         logging.info(COMPOENENT, "redirecting to login Page")
    //         setLoading(false)
    //         setToken(null)
    //         setUser(null)
    //     }
    // }, [])


   
    const [loading, setLoading] = useState<boolean>(true);


    /** change pages without using redirect  */
    const history = useHistory()
    

    return (
        <UserProvider>
            <EntryComponent/>
        </UserProvider>
    )
}

export default Mcapp
