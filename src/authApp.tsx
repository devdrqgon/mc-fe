

import { Header } from 'components/header'
import { Switch, Route } from 'react-router'
import NewUserWizard from 'features/newUserWizard'
import NewDashboard from 'features/dashboard/newDashboard'
import { Redirect } from 'react-router-dom'
import { Box } from '@chakra-ui/react'




const AuthApp = () => {
    return (
        <>
            <Header />
            <Box mt={10}>
                <Switch>
                    <Route path="/" exact
                        render={(props) => (
                            <NewDashboard
                                _username={localStorage.getItem('username')!}
                                _token={`Bearer ${localStorage.getItem('token')!}`}
                            />
                        )}
                    />
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
                            <NewDashboard
                                _username={localStorage.getItem('username')!}
                                _token={`Bearer ${localStorage.getItem('token')!}`}
                            />
                        )}
                    />
                    <Route render={() => <> PageNotFound </>} />
                </Switch>
            </Box>
        </>
    )
}

export default AuthApp