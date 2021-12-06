import HInfoDisplayer from "components/hInfoDisplayer"
import React from "react"
import { HiDotsVertical } from "react-icons/hi"
import { GrMoney } from "react-icons/gr"
import HContainer from "components/ui/Layout/HContainer"
import { AlignmentOptions } from "components/ui/Layout"
import Card from "components/ui/Layout/Card/Card"
import VContainer from "components/ui/Layout/VContainer"
import Text from 'components/ui/typography/Text'


interface SalaryCardProps {
    _amount: number,
    _daysLeft: number
}
const SalaryCard: React.FC<SalaryCardProps> = (props) => {
    return (
        <>
            <Card>
            <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}
                >
                    <HContainer
                    >
                        <GrMoney size={25} />
                        <Text>Salray</Text>
                    </HContainer>
                    <HiDotsVertical size={25} style={{ 'cursor': 'pointer' }} />
                </HContainer>
                {/* <VContainer
                >
                    <VContainer
                    >
                        <HInfoDisplayer _field={"amount"} _value={`€${props._amount}`} />
                        <HInfoDisplayer _field={"next salary in"} _value={`${props._daysLeft.toString()} days`} />
                    </VContainer>
                </VContainer> */}
            </Card>
        </>
    )
}

export default SalaryCard
