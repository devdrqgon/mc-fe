import { UserContext } from 'contexts/user.context';
import React, { useContext } from 'react'

export const Header = () => {

    const { user, token, tokenValid, login, logout, authenticated } = useContext(UserContext);
    return (
        <div style={{
            backgroundColor: '#1495CE',
            display: 'grid',
            gridTemplateColumns: '2.6fr 0.4fr',
            gridTemplateRows: '1fr',
            gap: '0px 0px',
            gridTemplateAreas: `
                    'brand profileIcon'
                `
        }}>
            <div
                style={{
                    gridArea: 'brand',
                }}>
                <div
                style={{
                    fontSize: 'x-large',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#1495CE'
                }}>
                    MoneyCoach! beta
                </div>
            </div>
            <div style={{
                fontSize: 'large',
                gridArea: 'profileIcon',
                color: 'white'
            }}
            >
                {user ?
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            welcome {localStorage.getItem('username')}!
                        </div>
                        <div>
                            <button onClick={logout}>logout</button>
                        </div>
                    </div>
                    :
                    <>
                    </>}
            </div>
        </div >
    )

}


