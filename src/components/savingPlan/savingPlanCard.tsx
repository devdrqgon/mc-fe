
import { HiDotsVertical } from 'react-icons/hi'
import { FaReact } from 'react-icons/fa'
import Card from 'components/ui/Layout/Card'
import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import ExpandedBillCard from 'components/bills/expandedBillCard'
import ModalChild from 'components/ui/Modal/ModalChild'
import ModalPortal from 'components/ui/Modal/PortalModal'
import { useState } from 'react'
import SavingPlanCreator from './savingPlanCreator'
import HContainer from 'components/ui/Layout/HContainer'
import { AlignmentOptions } from 'components/ui/Layout'

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
                <HContainer  justifyContent={AlignmentOptions.spaceBetween}>
                    <HContainer justifyContent={AlignmentOptions.flexStart}>
                        <FaReact />
                        <h1>
                            Saving Plan
                        </h1>
                    </HContainer>
                    <HiDotsVertical style={{ 'cursor': 'pointer' }} />
                </HContainer>
                <CardButton onClick={() => { setModalOpen(true) }}>
                    Create a Plan!
                </CardButton>
            </Card>
            <ModalPortal modalOpen={modalOpen}>
                <ModalChild setModalOpen={setModalOpen} >
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
