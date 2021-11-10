import axios, { AxiosRequestConfig } from 'axios'
import logging from 'config/logging'
import React, { ChangeEvent } from 'react'
import { useHistory } from 'react-router'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { BootstrapButton } from 'components/myButton'
import { Link } from 'react-router-dom';

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
                    justifyContent: 'center',
                    alignItems: 'center'


                }}>
                <Card style={{

                    width: '400px',
                    height: '600px',

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
                                height: '65vh',
                                width: '100wh',
                            }}>
                            <div
                                style={{
                                    gridArea: 'title',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                <Typography variant="h4" component="div">
                                    Register
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


                                <BootstrapButton onClick={registerClicked} variant="contained" disableRipple>
                                    Sign Up
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
                                <Link to={"/login"}>Already a member Account? Login here!</Link>

                            </div>
                        </div>
                    </CardContent>

                </Card>

            </div>


        </div >
    )
}
