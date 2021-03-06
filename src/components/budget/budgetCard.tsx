import AmountDisplayer from "components/AmountDisplayer"
import HInfoDisplayer from "components/hInfoDisplayer"
import React, { useContext } from "react"
import { HiDotsVertical } from "react-icons/hi"
import { CgCalculator } from "react-icons/cg"
import HContainer from "components/ui/Layout/HContainer"
import VContainer from "components/ui/Layout/VContainer"
import { AlignmentOptions } from "components/ui/Layout"
import Card from "components/ui/Layout/Card/Card"
import Text from 'components/ui/typography/Text'
import HSpacer from "components/ui/Layout/HSpacer"
import { DashboardContext } from "contextProviders/dashboard.provider"



const BudgetCard: React.FC  = () => {
    const { BudgetStateUI}  = useContext(DashboardContext)
    return (
        <>
            <Card>
                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}
                >
                    <Text>Budget</Text>
                    <HiDotsVertical size={25} style={{ 'cursor': 'pointer' }} />
                </HContainer>
                <HSpacer />
                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}>
                    <Text>
                        daily
                    </Text>
                    <Text>
                        €{BudgetStateUI?.daily.toFixed(1)}
                    </Text>
                </HContainer>
                <HSpacer _space={6} />
                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}>
                    <Text>
                        weekly
                    </Text>
                    <Text>
                        €{BudgetStateUI?.weekly.toFixed(1)}
                    </Text>
                </HContainer>
            </Card>
        </>
    )
}

export default BudgetCard
