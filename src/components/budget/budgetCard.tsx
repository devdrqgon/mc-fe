import AmountDisplayer from "components/AmountDisplayer"
import HInfoDisplayer from "components/hInfoDisplayer"
import React from "react"
import { HiDotsVertical } from "react-icons/hi"
import { CgCalculator } from "react-icons/cg"
import HContainer from "components/ui/Layout/HContainer"
import VContainer from "components/ui/Layout/VContainer"
import { AlignmentOptions } from "components/ui/Layout"
import Card from "components/ui/Layout/Card/Card"
import Text from 'components/ui/typography/Text'


interface BudgetCardProps {
    _weekly: number,
    _daily: number
}
const BudgetCard: React.FC<BudgetCardProps> = (props) => {
    return (
        <>
            <Card>     
            <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}
                >
                    <HContainer
                    >
                        <CgCalculator size={25} />
                        <Text>Budget</Text>
                    </HContainer>
                    <HiDotsVertical size={25} style={{ 'cursor': 'pointer' }} />
                </HContainer>
            {/* <VContainer>
                <VContainer
                >
                    <HInfoDisplayer _field={"Weekly Budget"} _value={`€${props._weekly.toFixed(2)}`} />
                    <HInfoDisplayer _field={"Daily Budget"} _value={`€${props._daily.toFixed(2)}`} />

                </VContainer>
            </VContainer> */}
        </Card>
        </>
    )
}

export default BudgetCard
