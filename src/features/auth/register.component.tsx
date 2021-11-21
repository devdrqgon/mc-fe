import axios, { AxiosRequestConfig } from 'axios'
import logging from 'config/logging'
import React, { ChangeEvent } from 'react'
import { useHistory } from 'react-router'
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
                        Register
                    </div>
                    <div
                        style={{
                            gridArea: 'main',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value as unknown as string) }} />


                        <input type="password" onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value as unknown as string) }} />

                        <button onClick={registerClicked}>
                            Sign Up
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
                        <Link to={"/login"}>Already a member Account? Login here!</Link>

                    </div>
                </div>
            </div>


        </div >
    )
}
