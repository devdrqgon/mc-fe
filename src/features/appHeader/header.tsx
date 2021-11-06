import { UserContext } from 'contexts/user.context';
import React, { useContext } from 'react'

export const Header = () => {

    const { user, token, tokenValid, login, logout, authenticated } = useContext(UserContext);
    return (
        <div style={{
            backgroundColor: user ? '#1495CE' : '#A61E4A',
            display: 'grid',
            gridTemplateColumns: '1.8fr 0.2fr',
            gridTemplateRows: '1fr',
            gap: '0px 0px',
            gridTemplateAreas: `
                    '. profileIcon'
                `
        }}>
            {user ?
                <div style={{
                    gridArea: 'profileIcon'
                }}
                    onClick={logout}>
                    logout
                </div> :
                <div style={{
                    gridArea: 'profileIcon'
                }}>
                    LoggedOut!
                </div>}
        </div >
    )

}


