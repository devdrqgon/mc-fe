import { UserContext } from "contexts/user.context"
import { Header } from "features/appHeader/header"
import { useContext } from "react"
import UnAuthApp from "unAuthApp"
import AuthApp from "authApp"
import { Toaster } from "react-hot-toast"




const EntryComponent = () => {

    const { tokenValid, authenticated } = useContext(UserContext);

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