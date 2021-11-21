import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import logging from 'config/logging'
import React, { ChangeEvent, useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from "contexts/user.context"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { InfosOfUser } from 'react-app-env'

export default function LoginPage() {
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [uiErr, setUIErr] = React.useState<string>('')
    const { login } = useContext(UserContext);

    const history = useHistory()
    async function checkIfNewUser() {
        const result: AxiosResponse<any, any> = await axios({
            method: 'GET',
            url: `http://localhost:8000/users/info/${localStorage.getItem('username')}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        console.log("InfosOfUser", result)
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
                toast.error('Login failed!')
            }
        } catch (error) {
            setUIErr('Login failed!')
            logging.error("Login", (error as Error).message, error)
        }
    }
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr',
                gap: '0px 0px',
                gridTemplateAreas: `
                'login login'
                `,
                height: '95vh',
                width: '100wh',
            }}
        >
            <div
                style={{
                    gridArea: 'login',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'


                }}>
                <div
                    style={{
                        display: 'grid',
                        // backgroundColor: 'yellow',
                        gridAutoColumns: '1fr',
                        gridTemplateColumns: '1fr',
                        gridTemplateRows: '0.5fr 2.2fr 0.3fr',
                        gap: '0px 0px',
                        gridTemplateAreas: `
                                    'title'
                                    'main'
                                    'footer'
                                `
                        ,
                    }}>
                    <div
                        style={{
                            gridArea: 'title',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                        Login


                    </div>
                    <div
                        style={{
                            gridArea: 'main',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value as unknown as string) }} />
                        <input type="password" onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value as unknown as string) }} />

                        <button onClick={loginClicked} >
                            Sign In
                        </button>
                        <div
                            style={{
                                color: 'red',
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '20px'
                            }}>
                            {uiErr}

                        </div>
                    </div>

                    <div
                        style={{ gridArea: 'footer' }}>
                        <Link to={"/register"}>No Account? Register here!</Link>
                        <br />
                    </div>
                </div>
            </div>


        </div >
    )
}
