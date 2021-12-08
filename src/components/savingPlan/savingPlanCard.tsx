
import { HiDotsVertical } from 'react-icons/hi'
import Card from 'components/ui/Layout/Card/Card'
import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import ModalChild from 'components/ui/Modal/ModalChild'
import ModalPortal from 'components/ui/Modal/PortalModal'
import { useState } from 'react'
import SavingPlanCreator from './savingPlanCreator'
import HContainer from 'components/ui/Layout/HContainer'
import { AlignmentOptions } from 'components/ui/Layout'
import Text from 'components/ui/typography/Text'

interface Props {
    _userMinBudget: number,
    _currentDailyBudget: number,
    _daysTillNxtSalary: number
}
const SavingPlanCard: React.FC<Props> = (props) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Card>
                <HContainer justifyContent={AlignmentOptions.spaceBetween}>
                    <Text>
                        Saving Plan
                    </Text>
                    <HiDotsVertical style={{ 'cursor': 'pointer' }} />
                </HContainer>
                <CardButton onClick={() => { setModalOpen(true) }}>
                    Create a Plan!
                </CardButton>
            </Card>
            <ModalPortal modalOpen={modalOpen}>
                <ModalChild _onCloseClickCallback={setModalOpen} >
                    <SavingPlanCreator
                        _userMinBudget={props._userMinBudget}
                        _currentDailyBudget={props._currentDailyBudget}
                        _daysTillNxtSalary={props._daysTillNxtSalary}
                    />
                </ModalChild>
            </ModalPortal>
        </>
    )
}

export default SavingPlanCard
