
import { HiDotsVertical } from 'react-icons/hi'
import Card from 'components/ui/Layout/Card/Card'
import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import { useContext, useState } from 'react'
import SavingPlanCreator from './savingPlanCreator'
import HContainer from 'components/ui/Layout/HContainer'
import { AlignmentOptions } from 'components/ui/Layout'
import Text from 'components/ui/typography/Text'
import { DashboardContext } from 'contextProviders/dashboard.provider'
import { ModalContext } from 'contextProviders/modal.provider'
import GoalCreator from 'features/goal/index.goal'
import SavingsAccountOverview, { SavingItem } from 'features/AccountsOverview/SavingsAccountOverview'


const SavingPlanCard: React.FC = () => {
    const { openModal } = useContext(ModalContext)
    const { SavingPlanStateUI } = useContext(DashboardContext)
    const _savingItems: SavingItem[] = [
        {
            _label: 'linz damage',
            _total: 5000
        },
        {
            _label: 'empty',
            _total: 1500
        },
        {
            _label: 'tunis',
            _total: 500
        },
        {
            _label: 'Kaution',
            _total: 2300
        }
    ]
    const onExpandClick = () => {
        openModal(
            <GoalCreator />
        )
    }
    return (
        <>
            <Card>
                <HContainer justifyContent={AlignmentOptions.spaceBetween}>
                    <Text>
                        Saving Account
                    </Text>
                    <HiDotsVertical style={{ 'cursor': 'pointer' }} />
                </HContainer>
                <SavingsAccountOverview _savingItems={_savingItems} _totalSavings={8900} />
            </Card>
        </>
    )
}

export default SavingPlanCard
