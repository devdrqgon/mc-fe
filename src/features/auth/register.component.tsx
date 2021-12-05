import axios, { AxiosRequestConfig } from 'axios'
import logging from 'config/logging'
import React, { ChangeEvent } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import CardButton from 'components/ui/Controls/Buttons/CardButtons';
import { AlignmentOptions } from 'components/ui/Layout';
import Card from 'components/ui/Layout/Card';
import HContainer from 'components/ui/Layout/HContainer';
import VContainer from 'components/ui/Layout/VContainer'
export default function Register() {
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [uiErr, setUIErr] = React.useState<string>('')
    const [showPassword, setShowPassword] = React.useState(false);

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
            alert((error as Error).message)

            logging.error("Regsiter", (error as Error).message, error)
        }
    }
    return (
        <VContainer
            justifyContent={AlignmentOptions.center}
            alignItems={AlignmentOptions.center}>
            <HContainer alignItems={AlignmentOptions.center}>
                <h1>Sign in to your account</h1>
            </HContainer>
            <Card
            >
                <HContainer>
                    <VContainer id="email">
                        <h6>Username</h6>
                        <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value as unknown as string) }} />
                    </VContainer>
                    <VContainer id="password">
                        <h6>Password</h6>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value as unknown as string) }} type="password" />
                    </VContainer>

                    <CardButton
                    >
                        Sign in
                    </CardButton>
                    <Link to={"/login"}>
                        <h6>  Already a memebr to MoneyCoach? login here!</h6>
                    </Link>

                </HContainer>
            </Card>
        </VContainer>
    )
}
