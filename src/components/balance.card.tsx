
import PercentageDisplayer from "components/AmountDisplayer"
import HInfoDisplayer from "components/hInfoDisplayer"
import { FaBalanceScaleLeft } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { AlignmentOptions } from "./ui/Layout"
import Card from "./ui/Layout/Card/Card"
import HContainer from "./ui/Layout/HContainer"
import Text from 'components/ui/typography/Text'
import HSpacer from "./ui/Layout/HSpacer"


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
                    <Text>balance</Text>
                    <HiDotsVertical size={25} style={{ 'cursor': 'pointer' }} />
                </HContainer>
                <HSpacer />
                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}>
                    <Text>
                        Main
                    </Text>
                    <Text>
                        €{props._mainAccountTotalBalance.toFixed(1)}
                    </Text>
                </HContainer>
                <HSpacer _space={6} />

                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}>
                    <Text>
                        Nett
                    </Text>
                    <Text>
                        € {props._nett.toFixed(1)}
                    </Text>
                </HContainer>
            </Card>
        </>
    )
}

export default BalanceCard