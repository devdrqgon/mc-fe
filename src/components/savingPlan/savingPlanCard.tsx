
import { HiDotsVertical } from 'react-icons/hi'
import Card from 'components/ui/Layout/Card/Card'
import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import ModalChild from 'components/ui/Modal/ModalChild'
import ModalPortal from 'components/ui/Modal/PortalModal'
import { useContext, useState } from 'react'
import SavingPlanCreator from './savingPlanCreator'
import HContainer from 'components/ui/Layout/HContainer'
import { AlignmentOptions } from 'components/ui/Layout'
import Text from 'components/ui/typography/Text'
import { DashboardContext } from 'contextProviders/dashboard.provider'
import { ModalContext } from 'contextProviders/modal.provider'

const SavingPlanCard: React.FC = () => {
    const { openModal } = useContext(ModalContext)
    const { SavingPlanStateUI } = useContext(DashboardContext)
    const onExpandClick = () => {
        openModal(
            <SavingPlanCreator
                _userMinBudget={SavingPlanStateUI!.userMinBudget}
                _currentDailyBudget={SavingPlanStateUI!.currentDailyBUdget}
                _daysTillNxtSalary={SavingPlanStateUI!.daysTillNxtSalary}
            />
        )
    }
    return (
        <>
            <Card>
                <HContainer justifyContent={AlignmentOptions.spaceBetween}>
                    <Text>
                        Saving Plan
                    </Text>
                    <HiDotsVertical style={{ 'cursor': 'pointer' }} />
                </HContainer>
                <CardButton onClick={onExpandClick}>
                    Create a Plan!
                </CardButton>
            </Card>
        </>
    )
}

export default SavingPlanCard
