
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
import { DashboardContext } from 'contexts/dashboard.context'

const SavingPlanCard: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { SavingPlanStateUI } = useContext(DashboardContext)

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
                    <>
                        {SavingPlanStateUI === null ?
                            <> </>
                            :
                            <SavingPlanCreator
                                _userMinBudget={SavingPlanStateUI?.userMinBudget}
                                _currentDailyBudget={SavingPlanStateUI?.currentDailyBUdget}
                                _daysTillNxtSalary={SavingPlanStateUI?.daysTillNxtSalary}
                            />}
                    </>
                </ModalChild>
            </ModalPortal>
        </>
    )
}

export default SavingPlanCard
