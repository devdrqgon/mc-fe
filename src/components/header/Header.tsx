import { UserContext } from 'contexts/user.context';
import { useContext } from 'react'
import { useHistory } from 'react-router';
import { ThemeContext } from 'styled-components';
import { Container } from './Header.styles';
import Switch from 'react-switch'
interface Props {
    _toggletheme(): void
}
export const Header: React.FC<Props> = (props) => {
    const history = useHistory()
    const { user, token, tokenValid, login, logout, authenticated } = useContext(UserContext);

    const handleLogoutClick = () => {
        history.push('/login')
        logout()
    }

    const { colors, title } = useContext(ThemeContext)
    return (
        <Container>
            <div>
                welcome {localStorage.getItem('username')}!
            </div>
            <div>
                <h1>
                    MoneyCoach
                </h1>
            </div>
            <Switch
                onChange={props._toggletheme}
                checked={title === 'dark'}
                checkedIcon={false}
                uncheckedIcon={false}
                height={10}
                width={40}
                handleDiameter={20}
                offColor={'#FFF'}
                onColor={'#264653'}
            />
            {authenticated === true ? 
                <>
                    <button onClick={handleLogoutClick}>Logout</button>
                </>
                :
                <>
                </>}
        </Container>
    )

}
