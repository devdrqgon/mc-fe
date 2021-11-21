

import { Header } from 'features/appHeader/header'
import Sample from 'features/planOverview/sample'
import { QueryClient, QueryCache, QueryClientProvider } from 'react-query'
import { Switch, Route } from 'react-router'
import { ReactQueryDevtools } from "react-query/devtools"
import OldUser from 'oldUser'
import NewUserWizard from 'features/onBoarding/newUserWizard'

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
                    <Route path="/olduser" component={OldUser} />

                </Switch>
                <ReactQueryDevtools />

            </QueryClientProvider>
        </div>

    )
}

export default AuthApp