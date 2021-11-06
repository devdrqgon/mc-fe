import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import logging from 'config/logging'
import UserContext from 'contexts/user.context'
import React, { ChangeEvent, useContext } from 'react'
import { useHistory } from 'react-router'
import authUtils from 'features/auth/utils.auth'

export default function LoginPage() {
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [uiErr, setUIErr] = React.useState<string>('')
    const userContext = useContext(UserContext)

    const history = useHistory()
    const loginClicked = async () => {
      
        try {
            const response : AxiosResponse<any, any>= await axios({
                method: 'POST',
                url: 'http://localhost:8000/users/login',
                data: {
                    username,
                    password
                },
            })

            if (response.status === 200) {
                authUtils.SaveLoginData(response.data.user.username, response.data.token);
                //save user & Token
                history.push('/planner')
            } else {
                setUIErr('Login failed!')
            }
        } catch (error) {
            setUIErr('Login failed!')
            logging.error("Login", (error as Error).message, error)
        }
    }
    return (
        <div>
            <input onChange={(e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value as unknown as string) }} ></input>
            <br />
            <input onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value as unknown as string) }}  ></input>
            <br />
            <button onClick={loginClicked}>
                Login!
            </button>
            <br />
            {uiErr}
        </div>
    )
}
