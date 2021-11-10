import { UserContext } from "contexts/user.context"
import { Header } from "features/appHeader/header"
import { useContext } from "react"
import UnAuthApp from "unAuthApp"
import AuthApp from "authApp"




const EntryComponent = () => {

    const { tokenValid, authenticated } = useContext(UserContext);

    if (tokenValid && authenticated)
        return <AuthApp />
    return (
        <>
            <Header />
            <UnAuthApp />
        </>
    )

}

export default EntryComponent