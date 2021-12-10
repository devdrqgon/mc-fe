    import ArtisticTitle from 'components/ui/typography/ArtisticTitle'
import React, { useContext, useEffect } from 'react'
import Text from 'components/ui/typography/Text'
import HSpacer from 'components/ui/Layout/HSpacer'
import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import { Link, useHistory } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import logging from 'config/logging'
import { UserContext } from 'contexts/user.context'
import toast from 'react-hot-toast'
import ModalPortal from 'components/ui/Modal/PortalModal'
import ModalChild from 'components/ui/Modal/ModalChild'
import VContainer from 'components/ui/Layout/VContainer'
import InputTextForm, { InputTypes } from 'components/ui/Controls/Inputs/InputTextForm'

const SignInModal = () => {


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
                setModalOpen(false)
                checkIfNewUser()

                //save user & Token
            } else {
                alert('Login failed!')
            }
        } catch (error) {
            logging.error("Login", (error as Error).message, error)
        }
    }

    const [modalOpen, setModalOpen] = React.useState(true);
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const onChangeUsername = (_newVal: string) => {
        setUsername(_newVal)
    }

    const onChangePassword = (_newVal: string) => {
        setPassword(_newVal)
    }

    const onClosedClicked = () => {
        setModalOpen(false)

    }

    useEffect(() => {
      

    }, [modalOpen])
    return (
        <>
            <ModalPortal modalOpen={modalOpen}>
                <ModalChild _onCloseClickCallback={onClosedClicked}>
                    <VContainer>
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
                    </VContainer>
                </ModalChild>
            </ModalPortal>

        </>
    )
}

export default SignInModal
