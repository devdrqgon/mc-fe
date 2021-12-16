import ArtisticTitle from 'components/ui/typography/ArtisticTitle'
import React, { useContext, useEffect } from 'react'
import Text from 'components/ui/typography/Text'
import InputTextForm, { InputTypes } from 'components/ui/Controls/Inputs/InputTextForm'
import HSpacer from 'components/ui/Layout/HSpacer'
import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import logging from 'config/logging'
import VContainer from 'components/ui/Layout/VContainer'
import ModalChild from 'components/ui/Modal/ModalChild'
import ModalPortal from 'components/ui/Modal/PortalModal'
import { ModalContext } from 'contextProviders/modal.provider'
import SignInCard from './SignInCard'



const SignUpCard = () => {
    const {closeModal, openModal} = useContext(ModalContext)
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [modalOpen, setModalOpen] = React.useState(true);

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
                closeModal()
                openModal(<SignInCard/>)
                
            } else {
            }
        } catch (error) {
            alert((error as Error).message)

            logging.error("Regsiter", (error as Error).message, error)
        }
    }

    const onChangeUsername = (_newVal: string) => {
        setUsername(_newVal)
    }

    const onChangePassword = (_newVal: string) => {
        setPassword(_newVal)
    }

    
    useEffect(() => {

    }, [modalOpen])
    return (
        <>
            <VContainer>
                <HSpacer />
                <h1>Sign Up</h1>
                <HSpacer />
                <InputTextForm _onChangeCallback={onChangeUsername} _label={'username'} />
                <HSpacer _space={5} />
                <InputTextForm _type={InputTypes.password} _onChangeCallback={onChangePassword} _label={'password'} />
                <HSpacer _space={10} ></HSpacer>
                <CardButton onClick={registerClicked}>
                    Sign Up
                </CardButton>
            </VContainer>

        </>
    )
}

export default SignUpCard
