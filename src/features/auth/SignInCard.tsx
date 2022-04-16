import ArtisticTitle from 'components/ui/typography/ArtisticTitle'
import React, { useContext, useEffect } from 'react'
import Text from 'components/ui/typography/Text'
import HSpacer from 'components/ui/Layout/HSpacer'
import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import { Link, useHistory } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import logging from 'config/logging'
import { UserContext } from 'contextProviders/user.context'
import VContainer from 'components/ui/Layout/VContainer'
import InputTextForm, { InputTypes } from 'components/ui/Controls/Inputs/InputTextForm'
import { ModalContext } from 'contextProviders/modal.provider'

export interface PeriodOfTime {
    start: number,
    end: number
}
export interface NewBill {
    username: string,
    paid: boolean,
    friendlyName: string,
    bankText: string,
    amount: number,
    when: PeriodOfTime,
    billType: string
}
export interface UserInfoResultDoc {
    _id: string,
    nextIncome: {
        amount: number,
        daysleft: number,
        weeksLeft: number
    },
    balance: {
        gross: number,
        netto: number
    },
    maxPerDay: number,
    maxPerWeek: number,
    willBeSaved: number,
    bills: {
        bills: NewBill[],
        paypalBills: NewBill[],
        manualBills: NewBill[],
    }
}
const SignInCard = () => {

    const { isOpen, closeModal, Body } = useContext(ModalContext)

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

        console.log("InfosOfUser", result.data)
        if (result.data === null) {

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
                closeModal()
                checkIfNewUser()

                //save user & Token
            } else {
                alert('Login failed!')
            }
        } catch (error) {
            logging.error("Login", (error as Error).message, error)
        }
    }


    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const onChangeUsername = (_newVal: string) => {
        setUsername(_newVal)
    }

    const onChangePassword = (_newVal: string) => {
        setPassword(_newVal)
    }



    useEffect(() => {


    }, [])
    return (
        <>
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

        </>
    )
}

export default SignInCard
