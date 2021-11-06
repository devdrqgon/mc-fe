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
import authUtils from 'features/auth/utils.auth'
import EntryComponent from 'entryComponent';


const COMPOENENT = "McApp"

const Mcapp = () => {
    return (
        <UserProvider>
            <EntryComponent/>
        </UserProvider>
    )
}

export default Mcapp
