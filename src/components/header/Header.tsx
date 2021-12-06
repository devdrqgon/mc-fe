import { UserContext } from 'contexts/user.context';
import { useContext } from 'react'
import { useHistory } from 'react-router';
import { ThemeContext } from 'styled-components';
import { Container } from './Header.styles';
import Switch from 'react-switch'
import CardButton from 'components/ui/Controls/Buttons/CardButtons';
import Text from 'components/ui/typography/Text';
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
            <Text>
                welcome {localStorage.getItem('username')}!
            </Text>
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
                    <CardButton onClick={handleLogoutClick}>Logout</CardButton>
                </>
                :
                <>
                </>}
        </Container>
    )

}
