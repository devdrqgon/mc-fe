import { UserContext } from 'contexts/user.context';
import React, { useContext } from 'react'
import { useHistory } from 'react-router';

export const Header = () => {
    const history = useHistory()
    const { user, token, tokenValid, login, logout, authenticated } = useContext(UserContext);

    const handleLogoutClick = () => {

        history.push('/login')
        logout()
    }
    return (
        <>
            {user ?
                <>
                    <div style={
                        {

                            display: 'grid',
                            gridTemplateColumns: '0.5fr 2.6fr 1fr',
                            gridTemplateRows: '1fr',
                            gap: '0px 0px',
                            gridTemplateAreas: `
                            'left brand right'
                            `,
                            backgroundColor: '#1D232A',
                            color: '#fff',
                        }
                    }>
                        <div style={{ gridArea: 'left', display: 'flex', justifyContent: 'center' }}>
                        welcome {localStorage.getItem('username')}!

                        </div>
                        <div style={{ gridArea: 'brand', display: 'flex', justifyContent: 'center' }}>
                        MoneyCoach
                        </div>
                        <div style={{ gridArea: 'right', display: 'flex' }}>
                            <button onClick={handleLogoutClick} > sign out </button>
                        </div>
                    </div>
                </>
                :

                <>
                    <div
                        style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#071D24', color: '#fff' }}
                    >
                                                   MoneyCoach

                    </div>
                </>}
        </>
    )

}



// <div style={{
//             backgroundColor: '#1495CE',
//             display: 'grid',
//             gridTemplateColumns: '2.6fr 0.4fr',
//             gridTemplateRows: '1fr',
//             gap: '0px 0px',
//             gridTemplateAreas: `
//                     'brand profileIcon'
//                 `
//         }}>
//             <div
//                 style={{
//                     gridArea: 'brand',
//                 }}>
//                 <div
//                     style={{
//                         color: 'white',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         backgroundColor: '#1495CE'
//                     }}>
//                     <Typography variant="h4" gutterBottom component="div">
//                         MoneyCoach! beta
//                     </Typography>

//                 </div>
//             </div>
//             <div style={{
//                 fontSize: 'large',
//                 gridArea: 'profileIcon',
//                 color: 'white'
//             }}
//             >
//                 {user ?
//                     <div style={{ display: 'flex' }}>
//                         <div>
//                             welcome {localStorage.getItem('username')}!
//                         </div>
//                         <div>
//                             <LogoutRoundedIcon onClick={logout} />
//                         </div>
//                     </div>
//                     :
//                     <>
//                     </>}
//             </div>
//         </div >

