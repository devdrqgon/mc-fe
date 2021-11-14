

import { Header } from 'features/appHeader/header'
import LoginPage from 'features/auth/login.component'
import Sample from 'features/planOverview/sample'
import toast, { Toaster } from 'react-hot-toast'
import { QueryClient, QueryCache, QueryClientProvider } from 'react-query'
import { Switch, Route } from 'react-router'
import { ReactQueryDevtools } from "react-query/devtools"
import OnBoarding from 'features/onBoarding/onBoarding'
import OldUser from 'oldUser'

// export const queryClient = new QueryClient({
//     queryCache: new QueryCache({
//         onError: (error: any) =>
//             toast.error(`Something went wrong: ${error.message}`),
//     }),
// })

export const queryClient = new QueryClient();


const AuthApp = () => {
    return (
        <div style={{
            height: '100vh'
        }}>
            <QueryClientProvider client={queryClient}>
                <Header />
                <Switch>
                    {/* <Route path="/planner" component={TimespanPlanner} /> */}
                    <Route path="/sample" component={Sample} />
                    <Route path="/newuser" component={OnBoarding} />
                    <Route path="/olduser" component={OldUser} />

                </Switch>
                {/* <ReactQueryDevtools /> */}

            </QueryClientProvider>
        </div>

    )
}

export default AuthApp