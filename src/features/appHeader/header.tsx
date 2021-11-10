import { UserContext } from 'contexts/user.context';
import React, { useContext } from 'react'
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

export const Header = () => {

    const { user, token, tokenValid, login, logout, authenticated } = useContext(UserContext);
    return (
        <>
            {user ?
                <>
                    <div style={
                        {

                            display: 'grid',
                            gridTemplateColumns: '2.6fr 0.4fr',
                            gridTemplateRows: '1fr',
                            gap: '0px 0px',
                            gridTemplateAreas: `
                            'brand profileIcon'
                            `,
                            backgroundColor: '#071D24',
                            color: '#fff',
                        }
                    }>
                        <div style={{ gridArea: 'brand', display: 'flex', justifyContent: 'center' }}>
                            <Typography style={{ marginTop: '15px' }} variant="h4" gutterBottom component="div">
                                MoneyCoach
                            </Typography>
                        </div>
                        <div style={{ gridArea: 'profileIcon', display: 'flex' }}>
                            <Typography style={{ marginTop: '7px', marginRight: '20px' }} variant="h6" gutterBottom component="div">
                                welcome {localStorage.getItem('username')}!
                            </Typography>
                            <div style={{ marginTop: '10px' }}>
                                <LogoutRoundedIcon onClick={logout} />
                            </div>

                        </div>
                    </div>
                </>
                :

                <>
                    <div
                        style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#071D24', color: '#fff' }}
                    >
                        <Typography style={{ marginTop: '15px' }} variant="h4" gutterBottom component="div">
                            MoneyCoach
                        </Typography>
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

