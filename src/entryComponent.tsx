import { UserContext } from "contexts/user.context"
import { Header } from "features/appHeader/header"
import Sample from "features/planOverview/sample"
import { TimespanPlanner } from "features/timespanPlanner/timeSpanPlanner"
import Home from "home"
import { useContext, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { QueryCache, QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom"
import LoginPage from "tmpPagesAuth/login.component"
import Register from "tmpPagesAuth/register.component"
import UnAuthApp from "unAuthApp"


const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error: any) =>
            toast.error(`Something went wrong: ${error.message}`),
    }),
})


const EntryComponent = () => {


    /** change pages without using redirect  */
    const history = useHistory()
    const { user, token, tokenValid, login, logout, authenticated } = useContext(UserContext);

    if (tokenValid && authenticated) {
        return (
            <QueryClientProvider client={queryClient}>
                <Header />
                <Switch>
                    <Route path="/planner" component={TimespanPlanner} />
                    <Route path="/sample" component={Sample} />
                    <Route path="/" component={Home} />
                </Switch>
                <Toaster />
            </QueryClientProvider>)
    }
    else {
        return (
            <>
                <Header />
                <UnAuthApp />
            </>
        )
    }
}

export default EntryComponent