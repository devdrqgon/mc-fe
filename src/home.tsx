import axios, { AxiosResponse } from "axios"
import { UserContext } from "contexts/user.context";
import OnBoarding from "features/onBoarding/onBoarding";
import { TimespanPlanner } from "features/timespanPlanner/timeSpanPlanner"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router";

const Home = () => {
    const { user, token } = useContext(UserContext)
    const [newUser, setNewUser] = useState<boolean>()
    const history = useHistory()

    useEffect(() => {
        async function fetchUserInfo() {
            const result: AxiosResponse<any, any> = await axios({
                method: 'GET',
                url: `http://localhost:8000/users/info/${user}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (result.data.usrInfo.length === 0) {
                setNewUser(true)
            }else{
                setNewUser(false)
            }
        }

        fetchUserInfo()

    }, [])

    return (
        <>
            {newUser === true ?
                <OnBoarding />
                :
                <>
                    Welcome Old user
                </>
            }
        </>
    )
}

export default Home