import { UserContext } from 'contexts/user.context';
import React, { useContext } from 'react'
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { ColorButton } from 'components/myButton';

export const Header = () => {

    const { user, token, tokenValid, login, logout, authenticated } = useContext(UserContext);
    return (
        <>
            {user ?
                <>
                    <div style={
                        {

                            display: 'grid',
                            gridTemplateColumns: '0.5fr 2.6fr 0.4fr',
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
                            <Typography style={{ marginTop: '20px', marginRight: '12px' }} variant="subtitle2" gutterBottom component="div">
                                welcome {localStorage.getItem('username')}!
                            </Typography>
                        </div>
                        <div style={{ gridArea: 'brand', display: 'flex', justifyContent: 'center' }}>
                            <Typography style={{ marginTop: '15px' }} variant="subtitle1" gutterBottom component="div">
                                MoneyCoach
                            </Typography>
                        </div>
                        <div style={{ gridArea: 'right', display: 'flex' }}>

                        <ColorButton style={{height: '30px', marginTop: '10px'}} variant="contained" onClick={logout}> Sign out</ColorButton>


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

