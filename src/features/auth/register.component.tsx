import axios, { AxiosRequestConfig } from 'axios'
import logging from 'config/logging'
import React, { ChangeEvent } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import CardButton from 'components/ui/Controls/Buttons/CardButtons';
import { AlignmentOptions } from 'components/ui/Layout';
import Card from 'components/ui/Layout/Card/Card';
import HContainer from 'components/ui/Layout/HContainer';
import VContainer from 'components/ui/Layout/VContainer'
import InputText from 'components/ui/Controls/Inputs/InputText'
import PageContainer from 'components/ui/Layout/PageContainer'
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
        <PageContainer>
                <Card>
                    <HContainer alignItems={AlignmentOptions.center}>
                        <h1>Sign up</h1>
                    </HContainer>
                    <VContainer
                        justifyContent={AlignmentOptions.center}
                        alignItems={AlignmentOptions.center}
                    >
                        <VContainer id="email">
                            <h6>Username</h6>
                            <InputText
                                type="text"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value as unknown as string) }}
                            />
                        </VContainer>
                        <VContainer id="password">
                            <h6>Password</h6>
                            <InputText
                                type="password"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value as unknown as string) }}
                            />
                        </VContainer>

                        <CardButton
                            onClick={registerClicked}
                        >
                            Sign in
                        </CardButton>
                        <Link to={"/login"}>
                            <h6>  Already a member? Sign in here!</h6>
                        </Link>
                    </VContainer>
                </Card>
            </PageContainer>
    )
}
