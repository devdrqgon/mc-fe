
import PercentageDisplayer from "components/AmountDisplayer"
import HInfoDisplayer from "components/hInfoDisplayer"
import { FaBalanceScaleLeft } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { AlignmentOptions } from "./ui/Layout"
import Card from "./ui/Layout/Card/Card"
import HContainer from "./ui/Layout/HContainer"
import Text from 'components/ui/typography/Text'


interface BalanceCardProps {
    _mainAccountTotalBalance: number
    _nett: number
    _unpaidBills: number
}
const BalanceCard: React.FC<BalanceCardProps> = (props) => {
    return (
        <>
            <Card
            >
                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}
                >
                    <HContainer
                    >
                        <FaBalanceScaleLeft size={25} />
                        <Text>balance</Text>
                    </HContainer>
                    <HiDotsVertical size={25} style={{ 'cursor': 'pointer' }} />
                </HContainer>
            </Card>
        </>
    )
}

export default BalanceCard