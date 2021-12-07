import ArtisticTitle from 'components/ui/typography/ArtisticTitle'
import React, { useContext } from 'react'
import NewLoginPageContainer, { Left, Right } from './NewLogin.styled'
import Text from 'components/ui/typography/Text'
import InputTextForm, { InputTypes } from 'components/ui/Controls/Inputs/InputTextForm'
import HSpacer from 'components/ui/Layout/HSpacer'
import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import { Link, useHistory } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import logging from 'config/logging'
import { UserContext } from 'contexts/user.context'
import toast from 'react-hot-toast'
interface Props{
    _onLoginSuccess: (value: React.SetStateAction<boolean>) => void
}
const NewLogin: React.FC<Props> = (props) => {
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const onChangeUsername = (_newVal: string) => {
        setUsername(_newVal)
    }

    const onChangePassword = (_newVal: string) => {
        setPassword(_newVal)
    }

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
                props._onLoginSuccess(false)
                login(response.data.user.username, response.data.token)

                checkIfNewUser()

                //save user & Token
            } else {
                alert('Login failed!')
            }
        } catch (error) {
            logging.error("Login", (error as Error).message, error)
        }
    }

    return (
        <>
            <HSpacer />
            <h1>Sign In</h1>
            <HSpacer />
            <InputTextForm _onChangeCallback={onChangeUsername} _label={'username'} />
            <HSpacer _space={5} />

            <InputTextForm
                _onChangeCallback={onChangePassword}
                _type={InputTypes.password}
                _label={'password'} />
            <HSpacer _space={10} ></HSpacer>
            <CardButton
                onClick={loginClicked}>
                Sign In
            </CardButton>
            <HSpacer _space={15} />
            <Link to={"/register"}>
                <h3>  New to MoneyCoach? Register here!</h3>
            </Link>
        </>
    )
}

export default NewLogin
