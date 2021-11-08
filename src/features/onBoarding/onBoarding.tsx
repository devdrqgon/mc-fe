import axios from 'axios'
import logging from 'config/logging'
import { UserContext } from 'contexts/user.context'
import React, { ChangeEvent, useContext } from 'react'
import { useHistory } from 'react-router'

function OnBoarding() {
    const { user, token } = useContext(UserContext)
    const history = useHistory()

    const [grossBalance, setGrossBalance] = React.useState<number>()
    const saveInitInfoClicked = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8000/users/info/',
                data: {
                    username: user,
                    grossBalance
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if(response.status=== 201){
                history.push("/home")
            }
        } catch (error) {
            logging.error("ONBoarding", (error as Error ).message )
        }
    }
    return (
        <div>
            Money Coach needs to know few things....
            <br />
            <div>
                <p>
                    How much money do you currently own?
                </p>
                <input onChange={(e: ChangeEvent<HTMLInputElement>) => { setGrossBalance(e.target.value as unknown as number) }} type={"number"}></input>
            </div>
            <br />
            <button onClick={saveInitInfoClicked}> Save</button>
        </div>
    )
}

export default OnBoarding
