import SavingPlanCreator from 'components/savingPlan/savingPlanCreator';
import VContainer from 'components/ui/Layout/VContainer';
import ModalChild from 'components/ui/Modal/ModalChild';
import ModalPortal from 'components/ui/Modal/PortalModal';
import { UserContext } from 'contexts/user.context';
import NewLogin from 'features/auth/NewLogin';
import React, { useContext, useEffect, useState } from 'react'
import HeaderContainer, { Btn, BtnGray, Left, Right } from './NewHeader.styled'

const NewHeader = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { user, token, tokenValid, login, logout, authenticated } = useContext(UserContext);

    useEffect(() => {
       
    }, [authenticated])
    return (
        <>
            <HeaderContainer>
                <Left>

                </Left>
                <Right>
                    {!authenticated ?
                        <>
                            <BtnGray
                                onClick={() => { setModalOpen(true) }}
                            > Sign In
                            </BtnGray>

                            <Btn> Sign Up</Btn>
                        </>
                        :
                        <>
                            <BtnGray
                                onClick={() => { logout() }}
                            > Sign Out
                            </BtnGray>
                        </>
                    }
                </Right>
            </HeaderContainer>
            <ModalPortal modalOpen={modalOpen}>
                <ModalChild setModalOpen={setModalOpen} >
                    <VContainer>
                        <NewLogin  _onLoginSuccess={setModalOpen}/>
                    </VContainer>
                </ModalChild>
            </ModalPortal>
        </>
    )
}

export default NewHeader
