

import { Header } from 'features/appHeader/header'
import Sample from 'features/planOverview/sample'
import { QueryClient, QueryCache, QueryClientProvider } from 'react-query'
import { Switch, Route } from 'react-router'
import { ReactQueryDevtools } from "react-query/devtools"
import NewUserWizard from 'features/onBoarding/newUserWizard'
import Dashboard from 'features/dashboard/dashboard'

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
                            <Dashboard
                                _username={localStorage.getItem('username')!}
                                _token={`Bearer ${localStorage.getItem('token')!}`}
                            />
                        )}
                    />

                </Switch>
                <ReactQueryDevtools />

            </QueryClientProvider>
        </div>

    )
}

export default AuthApp