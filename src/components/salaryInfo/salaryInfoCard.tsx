import HInfoDisplayer from "components/hInfoDisplayer"
import React, { useContext } from "react"
import { HiDotsVertical } from "react-icons/hi"
import { GrMoney } from "react-icons/gr"
import HContainer from "components/ui/Layout/HContainer"
import { AlignmentOptions } from "components/ui/Layout"
import Card from "components/ui/Layout/Card/Card"
import VContainer from "components/ui/Layout/VContainer"
import Text from 'components/ui/typography/Text'
import HSpacer from "components/ui/Layout/HSpacer"
import { DashboardContext } from "contexts/dashboard.context"


const SalaryCard: React.FC = () => {
    const { SalaryInfoStateUI}  = useContext(DashboardContext)

    return (
        <>
            <Card>
                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}
                >
                    <Text>Salary</Text>

                    <HiDotsVertical size={25} style={{ 'cursor': 'pointer' }} />
                </HContainer>
                <HSpacer />
                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}>
                    <Text>
                        amount
                    </Text>
                    <Text>
                        €{SalaryInfoStateUI?.amount}
                    </Text>
                </HContainer>
                <HSpacer _space={6} />
                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}>
                    <Text>
                        days Left
                    </Text>
                    <Text>
                        {SalaryInfoStateUI?.daysLeft}
                    </Text>
                </HContainer>
            </Card>
        </>
    )
}

export default SalaryCard
