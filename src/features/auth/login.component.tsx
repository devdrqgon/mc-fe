import axios, { AxiosResponse } from 'axios'
import logging from 'config/logging'
import React, { ChangeEvent, useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from "contexts/user.context"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import HContainer from 'components/ui/Layout/HContainer'
import { AlignmentOptions } from 'components/ui/Layout'
import VContainer from 'components/ui/Layout/VContainer'
import Card from 'components/ui/Layout/Card'
import CardButton from 'components/ui/Controls/Buttons/CardButtons'

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
        <>
            <VContainer
                justifyContent={AlignmentOptions.center}
                alignItems={AlignmentOptions.center}
            >
                <HContainer alignItems={AlignmentOptions.center}>
                    <h1>Sign in to your account</h1>
                </HContainer>
                <Card
                >
                    <VContainer
                        justifyContent={AlignmentOptions.center}
                        alignItems={AlignmentOptions.center}

                    >
                        <VContainer id="email">
                            <h6>Username</h6>
                            <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value as unknown as string) }} />
                        </VContainer>
                        <VContainer id="password">
                            <h6>Password</h6>
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value as unknown as string) }} type="password" />
                        </VContainer>

                        <CardButton
                        onClick={loginClicked}
                        >
                            Sign in
                        </CardButton>
                        <Link to={"/register"}>
                            <h6>  New to MoneyCoach? Register here!</h6>
                        </Link>
                    </VContainer>
                </Card>
            </VContainer>
        </>
    )
}


