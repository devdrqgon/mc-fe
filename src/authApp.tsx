

import { Header } from 'features/appHeader/header'
import LoginPage from 'features/auth/login.component'
import Sample from 'features/planOverview/sample'
import { TimespanPlanner } from 'features/timespanPlanner/timeSpanPlanner'
import Home from 'home'
import toast, { Toaster } from 'react-hot-toast'
import { QueryClient, QueryCache, QueryClientProvider } from 'react-query'
import { Switch, Route } from 'react-router'
import { ReactQueryDevtools } from "react-query/devtools"
const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error: any) =>
            toast.error(`Something went wrong: ${error.message}`),
    }),
})

const AuthApp = () => {


    return (
        <QueryClientProvider client={queryClient}>
            <Header />
            <Switch>
                <Route path="/planner" component={TimespanPlanner} />
                <Route path="/sample" component={Sample} />
                <Route path="/login" component={LoginPage} />
                <Route path="/" component={Home} />
            </Switch>
            <ReactQueryDevtools />

            <Toaster />
        </QueryClientProvider>
    )
}

export default AuthApp