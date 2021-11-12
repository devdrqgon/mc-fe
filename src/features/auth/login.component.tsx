import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import logging from 'config/logging'
import React, { ChangeEvent, useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from "contexts/user.context"
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { BootstrapButton } from 'components/myButton'
import toast from 'react-hot-toast'
import background from "./bubble.png"

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
        if (result.data.info.length === 0) {
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
                backgroundImage: `url(${background})` 
            }}
        >
            <div
                style={{
                    gridArea: 'login',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'


                }}>
                <Card style={{
                    marginTop: "200px",
                    width: '400px',
                    height: '300px',
                    

                }}>
                    <CardContent>
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
                                <Typography variant="h4" component="div">
                                    Login
                                </Typography>

                            </div>
                            <div
                                style={{
                                    gridArea: 'main',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                <TextField style={{ marginBottom: '20px' }} onChange={(e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value as unknown as string) }} id="outlined-basic" label="Username" variant="outlined" />

                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value as unknown as string) }}
                                />

                               
                                <BootstrapButton onClick={loginClicked} variant="contained" disableRipple>
                                    Sign In
                                </BootstrapButton>
                                <div
                                    style={{
                                        color: 'red',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: '20px'
                                    }}>
                                    <Typography variant="h6" component="div">
                                        {uiErr}
                                    </Typography>
                                </div>
                            </div>

                            <div
                                style={{ gridArea: 'footer' }}>
                                <Link to={"/register"}>No Account? Register here!</Link>
                                <br />
                            </div>
                        </div>
                    </CardContent>

                </Card>

            </div>


        </div >
    )
}
