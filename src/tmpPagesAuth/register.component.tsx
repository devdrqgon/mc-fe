import axios, { AxiosRequestConfig } from 'axios'
import logging from 'config/logging'
import React, { ChangeEvent } from 'react'
import { useHistory } from 'react-router'

export default function Register() {
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [uiErr, setUIErr] = React.useState<string>('')

    const history = useHistory()
    const registerClicked = async () => {
    
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8000/users/auth/register',
                data: {
                    username,
                    password
                },
            })

            if (response.status === 201) {
                //No need to move to login 
                history.push('/login')
            } else {
                setUIErr('Register failed!')
            }
        } catch (error) {
            logging.error("Regsiter", (error as Error).message, error)
        }
    }
    return (
        <div>
            <input onChange={(e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value as unknown as string) }} ></input>
            <br />
            <input onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value as unknown as string) }}  ></input>
            <br />
            <button onClick={registerClicked}>
                Register!
            </button>
        </div>
    )
}
