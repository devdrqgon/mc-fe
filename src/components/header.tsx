import { Button } from '@chakra-ui/button';
import { Flex, Heading } from '@chakra-ui/layout';
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
                    <Flex
                        bg='#1D232A'
                        color='#fff'
                        w="full"
                        justifyContent="space-around"
                    >
                        <div style={{ gridArea: 'left', display: 'flex', justifyContent: 'center' }}>
                            <Heading mt={2} as='h3' size='sm'>
                                welcome {localStorage.getItem('username')}!
                            </Heading>
                        </div>
                        <div style={{ gridArea: 'brand', display: 'flex', justifyContent: 'center' }}>
                            <Heading as='h3' size='lg'>
                                MoneyCoach
                            </Heading>
                        </div>

                        <div style={{ gridArea: 'right', display: 'flex' }}>
                            <Button colorScheme={'#1D232A'} onClick={handleLogoutClick} > sign out </Button>
                        </div>
                    </Flex>
                    <div style={
                        {

                            display: 'grid',
                            gridTemplateColumns: '0.5fr 2.6fr 1fr',
                            gridTemplateRows: '1fr',
                            gap: '0px 0px',
                            gridTemplateAreas: `
                            'left brand right'
                            `,

                        }
                    }>

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
