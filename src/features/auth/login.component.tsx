import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import logging from 'config/logging'
import React, { ChangeEvent, useContext } from 'react'
import { useHistory } from 'react-router'
import authUtils from 'features/auth/utils.auth'
import { UserContext } from "contexts/user.context"
import { Link } from 'react-router-dom'

export default function LoginPage() {
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [uiErr, setUIErr] = React.useState<string>('')
    const { user, token, tokenValid, login, logout, authenticated } = useContext(UserContext);

    const history = useHistory()
    async function checkIfNewUser() {
        const result: AxiosResponse<any, any> = await axios({
            method: 'GET',
            url: `http://localhost:8000/users/info/${localStorage.getItem('username')}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (result.data.usrInfo.length === 0) {
            history.push('/newuser')
        } else {
            history.push('/olduser')
        }
    }
    const loginClicked = async () => {

        try {

            const response: AxiosResponse<any, any> = await axios({
                method: 'POST',
                url: 'http://localhost:8000/users/auth/login',
                data: {
                    username,
                    password
                },
            })

            if (response.status === 200) {
                login(response.data.user.username, response.data.token)

                checkIfNewUser()

                //save user & Token
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
            <Link to={"/register"}>No Account? Register here!</Link>
            <br />
            {uiErr}
        </div>
    )
}
