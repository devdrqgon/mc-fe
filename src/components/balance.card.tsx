
import PercentageDisplayer from "components/AmountDisplayer"
import HInfoDisplayer from "components/hInfoDisplayer"
import { FaBalanceScaleLeft } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { AlignmentOptions } from "./ui/Layout"
import Card from "./ui/Layout/Card"
import HContainer from "./ui/Layout/HContainer"
import VContainer from "./ui/Layout/VContainer"



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
                <VContainer
                    bg="yellow"
                    alignItems={AlignmentOptions.center} >
                    <HContainer bg="tomato" justifyContent={AlignmentOptions.spaceBetween}>
                        <HContainer fullWidth>
                            <FaBalanceScaleLeft />
                            <h1>
                                Balance

                            </h1>
                        </HContainer>
                        <HiDotsVertical style={{ 'cursor': 'pointer' }} />
                    </HContainer>
                    <VContainer>
                        <VContainer>
                            <HInfoDisplayer _field={"Main"} _value={`€${props._mainAccountTotalBalance.toFixed(2)}`} />
                            <PercentageDisplayer _nett={props._nett} _unpaidBills={props._unpaidBills} />

                        </VContainer>
                    </VContainer>
                </VContainer>
            </Card>
        </>
    )
}



export default BalanceCard