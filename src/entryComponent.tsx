import { UserContext } from "contexts/user.context"
import { Header } from "features/appHeader/header"
import { useContext } from "react"
import UnAuthApp from "unAuthApp"
import AuthApp from "authApp"
import { Toaster } from "react-hot-toast"
import { useHistory } from "react-router"
import TestPage from './testPage'


const EntryComponent = () => {

    const history = useHistory()
    const { tokenValid, authenticated } = useContext(UserContext);

    if(history.location.pathname.includes("/test")){
        return <TestPage/>
    }
    if (tokenValid && authenticated)
        return <AuthApp />
    return (
        <>
            <Header />
            <UnAuthApp />
            <Toaster />

        </>
    )

}

export default EntryComponent